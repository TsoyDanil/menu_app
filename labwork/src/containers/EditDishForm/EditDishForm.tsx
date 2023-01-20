import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/UI/Loader/Loader';
import IDish from "../../interfaces/IDish";
import IMenuCombinedData from '../../interfaces/IMenuCombinedData';
import { changeDishData, getMenu } from '../../store/Menu/menu.slice';
import { AppState, useAppDispatch } from "../../store/store";
import './EditDishForm.css'

const EditDishForm: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

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

    const submitDish = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const dataObject: IMenuCombinedData = {
            id: params.key,
            dishData: dish
        }
        await dispatch(changeDishData(dataObject))
        await dispatch(getMenu())
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
                <Loader/> :
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
                    <button
                            onClick={() => navigate(-1)}
                            className="AddForm__button"
                    >Cancel</button>              
                </>
            }
        </div>
    )
}

export default EditDishForm