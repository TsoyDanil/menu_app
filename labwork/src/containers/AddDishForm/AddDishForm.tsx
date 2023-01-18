import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import IDish from "../../interfaces/IDish";
import { postNewDish } from '../../store/Menu/menu.slice';
import { AppState, useAppDispatch } from "../../store/store";
import './AddDishForm.css'

const AddDishForm: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const {loading} = useSelector((state: AppState) => state.menu)

    const [dish, setDish] = useState<IDish>(
        {
            name: '',
            cost: 0,
            imageSrc: ''
        }
    )

    
    const checkButton = (): void => {
        if (dish.name.trim() === '' || dish.imageSrc.trim() === '' || dish.cost <= 0){
            setButtonDisabled(true)
            return
        }
        setButtonDisabled(false)
    }

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setDish(prevState => {
            return {...prevState, [name]: value}
        })
    }

    const submitDish = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(postNewDish(dish))
        setDish({
            name: '',
            cost: 0,
            imageSrc: ''
        })
    }

    useEffect(() => {
        checkButton()
    }, [dish])

    return(
        <div className="AddDishForm">
            {
                loading ? 
                <h1>Loading...</h1> :
                <>
                    <form onSubmit={(event) =>{submitDish(event)}}>
                        <div className='AddDishForm_inner_block'>
                            <p>Dish</p>
                            <input type={'text'} name={'name'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <div className='AddDishForm_inner_block'>
                            <p>Cost</p>
                            <input type={'number'} name={'cost'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <div className='AddDishForm_inner_block'>
                            <p>Image</p>
                            <input type={'text'} name={'imageSrc'} onChange={(event)=>{inputHandler(event)}}/>
                        </div>
                        <button
                        disabled={buttonDisabled}
                        className="AddForm__button"
                    >Add</button>                       
                    </form>
                </>
            }
        </div>
    )
}

export default AddDishForm