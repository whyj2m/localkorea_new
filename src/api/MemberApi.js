import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

const axiosInstance = axios.create({
    baseURL,
    headers:{
        'Content-Type':'application/json',
        'Authorization' : ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : '',
    }
})

// login
export const postLogin = async (data)=> {
    try {
        const response = await axiosInstance.post("/login", data)
        console.log(response.data.token);
        if(response.data.token) {
            localStorage.setItem("ACCESS_TOKEN", response.data.token)
            window.location.href = "/"
        }
    } catch (error) {
        console.error("로그인 에러 : ", error);
    }
}

export const getMemberList = async ()=> {
    try {
        const response = await axiosInstance.get('/members')
        return response
    } catch (error) {
        throw error
    }
}

