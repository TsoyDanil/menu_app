import IOrderResponse from "../../interfaces/IOrderResponse";

export default interface IOrderState{
    orders: IOrderResponse,
    loading: boolean
}