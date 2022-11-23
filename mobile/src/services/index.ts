import axios from "axios"
import { getFromLocalStorage } from "../utils/localStorage"

export interface IResponse {
    status : number
    hasError : boolean,
    errorCode ?: string,
    errorMessage ?: string,
    data ?: any
}

export interface PaginationQuery {
    limit ?: number
    offset ?: number
}

export const baseUrl = "http://localhost:8080/api/v1"
// export const baseUrl = "http://10.107.130.62:8080/api/v1"
// export const baseUrl = "http://192.168.0.113:8080/api/v1"
// export const baseUrl = "https://8c23-187-84-34-237.sa.ngrok.io/api/v1"

export const getToken = async () => { 
    return await getFromLocalStorage('devint-authorization')
}

const api = axios.create({
    baseURL : baseUrl,
    headers: { Authorization: `Bearer ${getToken()}` }
})

export const buildQuery = (queryObj : Object) => {
    return Object.entries(queryObj).map(([key, val]) => `${key}=${val}`).join('&')
}

export default api
