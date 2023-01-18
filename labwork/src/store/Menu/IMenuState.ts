import IDishResponse from "../../interfaces/IDishResponse";


export default interface IMenuState {
    dishes: IDishResponse,
    loading: boolean
}