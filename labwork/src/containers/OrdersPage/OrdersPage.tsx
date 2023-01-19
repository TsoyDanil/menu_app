import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getOrders, completeOrder } from "../../store/Order/order.slice";
import { AppState, useAppDispatch } from "../../store/store";
import './OrdersPage.css'

const OrdersPage: React.FunctionComponent = (): React.ReactElement => {

    const dispatch = useAppDispatch()

    const {dishes} = useSelector((state: AppState) => state.menu)

    const {loading, orders} = useSelector((state: AppState) => state.orders, shallowEqual)

    const showPrices= () => {
        const array: any = Object.keys(orders).map((key: string) => {
            return orders[key]
        }).map((order) => {
            const orderHandler = []
            for (let i = 0; i < order.length; i++){
                orderHandler.push(
                    {
                        amount: order[i].amount,
                        dish: dishes[order[i].name].name,
                        total: dishes[order[i].name].cost * order[i].amount
                    }
                    // <div>
                    //     <p>{order[i].amount}X {order[i].name}</p>
                    // </div>
                    // `${order[i].amount}X ${dishes[order[i].name].name} : ${dishes[order[i].name].cost * order[i].amount}`
                )
            }
            console.log(orderHandler, "OH")
            // console.log(orderHandler, 'ODER HANDLER')
            // return {
            //     orderHandler
            // }
            // return orderHandler
        })

        
        
        // for (let i = 0; i < array.length; i++){
        //     testArray.push(array[i])
        //     for (let j = 0; j < array[i].length; j++){
        //         console.log(dishes[array[i][j].name].name + ':' +  array[i][j].amount + 'overall:' + array[i][j].amount*dishes[array[i][j].name].cost)
                // testArray.push(
                //     {   
                //         amount: array[i][j].amount,
                //         dish: dishes[array[i][j].name].name,
                //         price:  array[i][j].amount*dishes[array[i][j].name].cost,
                //     }
                // )
        //     }
        // }
        // console.log(testArray, 'T')
        console.log(array, 'Finall array')
    }

    const completeOrderHandler = async (key: string) => {
        await dispatch(completeOrder(key))
        dispatch(getOrders())
    }

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    return(
        <div className="OrdersPage">
            <h1>Orders:</h1>
            {
                loading ? 
                <h1>Loading...</h1> : 
                <>
                    {
                    Object.keys(orders).length ? 
                    <div className="Orders_container">   
                        {
                            Object.keys(orders).map((key: string) => {
                                return <div key={key} className="OrderTab">
                                            Order data will be here!
                                            <button onClick={()=>completeOrderHandler(key)}>Complete order</button>
                                        </div>
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

                        // Object.keys(orders).map((key: string) => {
                        //     return orders[key]
                        // }).map((order) => {
                        //     const handler = []
                        //     for (let i = 0; i < order.length; i++){
                        //         if (order[i]?.name !== undefined && dishes[order[i].name]?.name !== undefined){
                        //             // handler.push(`${order[i].amount} x ${dishes[order[i].name].name}. ${dishes[order[i].name].cost * order[i].amount}`)
                        //             handler.push(
                        //                 {   
                        //                     amount: order[i].amount,
                        //                     name: dishes[order[i].name].name,
                        //                     price: dishes[order[i].name].cost,
                        //                 }
                        //             )
                        //         }
                        //     }
                        //     return handler
                        // }).map((orderHandler) => {
                        //     console.log(orderHandler)
                        //     // return <div>{order[0]?.name}</div>
                        //     console.log(orderHandler.length)
                        //     for (let i = 0; i < orderHandler.length; i++){
                        //         console.log(orderHandler[i])
                        //             // return <div key={Math.random()} className="OrderTab">
                        //             //             <p>{orderHandler[i].amount}X {orderHandler[i].name}. Total: {orderHandler[i].price}</p>
                        //             //         </div>
                        //         return <p>1</p>
                        //     }
                        //     // return <div className="OrderTab">
                        //     //             <p>1</p>
                        //     //         </div>
                            
                        // })

export default OrdersPage