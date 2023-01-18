import { menuInstance } from "./instances"


export const menuApi = {
    getMenu: async() => {
        try{
            const response = await menuInstance.get('.json')
            return response.data
        } catch(error){
            console.log(error)
        }
    }
}