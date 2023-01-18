import { AxiosInstance } from "axios";
import axios from "axios";
import { apiUrl } from "./apiUrl";


export const menuInstance: AxiosInstance = axios.create({
    baseURL: apiUrl + '/menu'
})