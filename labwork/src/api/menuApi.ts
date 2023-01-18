import IDishResponse from "../interfaces/IDishResponse";
import { menuInstance } from "./instances";
import { AxiosResponse} from 'axios'
import IDish from "../interfaces/IDish";

class MenuApi {
    public getMenu = async(): Promise<IDishResponse | void> => {
        try{
            const response:AxiosResponse<IDishResponse>  = await menuInstance.get('.json')
            return response.data
        } catch(error: unknown){
            console.log(error)
        }
    }
    public postNewDish = async (dish: IDish): Promise<void> => {
        try{
            await menuInstance.post('.json', dish)
        }
        catch(error:unknown){
            console.log(error)
        }
    }
    public changeDishData = async (id: string | undefined, dish: IDish): Promise<void> => {
        try{
            await menuInstance.put( id + '.json', dish)
        }
        catch(error:unknown){
            console.log(error)
        }
    }
    public deleteDishFromMenu = async (id: string | undefined): Promise<void> => {
        try{
            await menuInstance.delete(id + '.json')
        } catch(error: unknown){
            console.log(error)
        }
    }
}

export const menuApi = new MenuApi()