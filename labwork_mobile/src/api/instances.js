import axios from "axios";
import { apiUrl } from "./apiUrl";

export const menuInstance = axios.create({
    baseURL: apiUrl + 'menu'
})

export const cartInstance = axios.create({
    baseURL: apiUrl + 'orders'
})