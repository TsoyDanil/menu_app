import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Loader } from "../../components/UI/Loader/Loader";
import { getOrders, completeOrder } from "../../store/Order/order.slice";
import { AppState, useAppDispatch } from "../../store/store";
import './OrdersPage.css'

const OrdersPage: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const {dishes} = useSelector((state: AppState) => state.menu)

    const {loading, orders, deliveryCoast} = useSelector((state: AppState) => state.orders, shallowEqual)

    const completeOrderHandler = async (key: string) => {
        await dispatch(completeOrder(key))
        dispatch(getOrders())
    }

    return(
        <div className="OrdersPage">
            <h1 className="OrdersPage__title">Orders:</h1>
            {
                loading ? 
                <Loader/> : 
                <>
                    {
                    Object.keys(orders).length > 0 ? 
                    <div className="Orders_container">   
                        {
                            Object.keys(orders).map((key: string) => {
                                try{
                                    let dishArrayHandler = []
                                for (let dish in orders[key]){
                                    dishArrayHandler.push({
                                        name: dishes[orders[key][dish].name],
                                        amount: orders[key][dish].amount,
                                        price: dishes[orders[key][dish].name].cost * orders[key][dish].amount
                                    })
                                }
                                const totalPrice = dishArrayHandler.map((dish) => {
                                    return dish.price
                                }).reduce((a, b) => (a + b))
                                return <div key={key} className="OrderTab">
                                            <>
                                                {
                                                    dishArrayHandler.map((dishData, i) => {
                                                        return <div key={i}>
                                                                    <p>{dishData.amount + ' ' + 'X' + ' ' + dishData.name.name} <span className="OrderTab_bold">{dishData.price}</span>KZT</p>
                                                                </div>
                                                    })
                                                }
                                            </>
                                            <p>Delivery cost: {deliveryCoast}</p>
                                            <p>Total: {totalPrice + deliveryCoast}</p>
                                            <button className="CompleteBtn" onClick={()=>completeOrderHandler(key)}></button>
                                        </div>
                                } catch(error: unknown){
                                    console.log(error)
                                    return null
                                }
                            })
                        }
                    </div>
                    :
                    <h1>No orders yet</h1>
                    }
                </>
            }
        </div>
    )
}

export default OrdersPage