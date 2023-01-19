import IDish from "../../interfaces/IDish";
import IOrder from "../../interfaces/IOrder";


export default interface IOrderBlockProps {
    order: IOrder,
    dish: IDish,
    amount: number
}