import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import IDish from "../../interfaces/IDish";
import IMenuCombinedData from '../../interfaces/IMenuCombinedData';
import { changeDishData } from '../../store/Menu/menu.slice';
import { AppState, useAppDispatch } from "../../store/store";
import './EditDishForm.css'

const EditDishForm: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const {loading, dishes} = useSelector((state: AppState) => state.menu, shallowEqual)

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const [dish, setDish] = useState<IDish>(
        {
            name: '',
            cost: 0,
            imageSrc: ''
        }
    )

    const params = useParams()

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setDish(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const submitDish = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const dataObject: IMenuCombinedData = {
            id: params.key,
            dishData: dish
        }
        dispatch(changeDishData(dataObject))
    }

    const checkButton = (): void => {
        if (dish.name.trim() === '' || dish.imageSrc.trim() === '' || dish.cost <= 0){
            setButtonDisabled(true)
            return
        }
        setButtonDisabled(false)
    }

    useEffect(() => {
        if (params.key){
            setDish(dishes[params.key])
        }
    },[])

    useEffect(() => {
        checkButton()
    }, [dish])

    return (
        <div className='EditDishForm'>
            {
                loading ? 
                <h1>Loading...</h1> :
                <>
                    <form onSubmit={(event) =>{submitDish(event)}}>
                        <div className='EditDishForm_inner_block'>
                            <p>Dish</p>
                            <input value={dish.name} type={'text'} name={'name'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <div className='EditDishForm_inner_block'>
                            <p>Cost</p>
                            <input value={dish.cost} type={'number'} name={'cost'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <div className='EditDishForm_inner_block'>
                            <p>Image</p>
                            <input value={dish.imageSrc} type={'text'} name={'imageSrc'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <button
                        disabled={buttonDisabled}
                        className="EditForm__button"
                    >Save changes</button>                       
                    </form>                    
                </>
            }
        </div>
    )
}

export default EditDishForm