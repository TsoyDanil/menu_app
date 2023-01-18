import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import DishBlock from '../../components/DishBlock/DishBlock'
import { getMenu, changeDishData } from "../../store/Menu/menu.slice";

import { AppState, useAppDispatch } from '../../store/store'
import './MenuPage.css'


const MenuPage: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {dishes, loading} = useSelector((state: AppState) => state.menu)

    const gotToAddForm = () => {
        navigate({pathname:'add-form'})
    }
    
    useEffect(()=>{
        dispatch(getMenu())
    },[])

    return(
        <div className='MenuPage'>
            <div className='MenuPage_title'>
                <p>Dishes</p>
                <button onClick={gotToAddForm}>Add new Dish</button>
            </div>
            {
                loading ? 
                <h1>Loading...</h1>
                :
                <>
                    {
                        Object.keys(dishes).length ? 
                        Object.keys(dishes).map((key: string) => {
                            return (
                                <DishBlock
                                    key={key}
                                    dish={dishes[key]}
                                    deleteDish={()=>{}}
                                    editDish={()=>{}}
                                />
                            )
                        })
                        :
                        <h1>No dishes yet...</h1>
                    }
                </>
            }
        </div>
    )
}

export default MenuPage