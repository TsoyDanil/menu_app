import { cartInstance } from "./instances"

export const cartApi = {
    postOrder: async(order) => {
        try{    
            await cartInstance.post('.json', order)
        } catch(error){
            console.log(error)
        }
    }
}