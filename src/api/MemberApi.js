import axios from "axios";

const baseURL = 'http://localhost:8081'
const axiosInstance = axios.create({
    baseURL,
    headers:{
        'Content-Type':'application/json',
    }
})

export const getMemberList = async ()=> {
    try {
        const response = await axiosInstance.get('/members')
        return response
    } catch (error) {
        throw error
    }
}