import { AxiosResponse } from "axios";
import IOrderResponse from "../interfaces/IOrderResponse";
import { ordersInstance } from "./instances";



class OrdersApi {
    public getOrders = async(): Promise<IOrderResponse | void> => {
        try{
            const response: AxiosResponse<IOrderResponse> = await ordersInstance.get('.json')
            return response?.data
        } catch(error: unknown){
            console.log(error)
        }
    }
    public completeOrder = async(id: string | undefined) => {
        try{
            await ordersInstance.delete(id + '.json')
        } catch(error: unknown){
            console.log(error)
        }
    }
}

export const ordersApi = new OrdersApi()