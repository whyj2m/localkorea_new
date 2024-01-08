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
        const token = response.data.token;
        if(token) {
            localStorage.setItem("ACCESS_TOKEN", token)
        }
    } catch (error) {
        // 비밀번호가 틀렸을 때의 에러 메시지 확인
        if (error.response && error.response.data.message === "Incorrect password.") {
            console.error("비밀번호가 일치하지 않습니다. error : ", error);
            
            // 사용자에게 알림 표시 또는 다른 처리 수행
            alert("비밀번호가 올바르지 않습니다.");
        }
        // console.error("로그인 에러 : ", error);
    }
}

// Google Login
export const googleLogin = async () => {
    try {
        const response = await axiosInstance.get("/oauth/loginInfo");
        // 로그인 정보를 콘솔에 출력하거나 필요한 처리 수행
        console.log(response.data);
        const token = new URL(window.location.href).searchParams.get("accessToken")
        const refreshToken = new URL(window.location.href).searchParams.get("refreshToken")
        if(token) {
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
        }
    } catch (error) {
        // 에러 처리
        console.error("Google login error: ", error);
    }
};

export const getMemberList = async ()=> {
    try {
        const response = await axiosInstance.get('/members')
        return response
    } catch (error) {
        throw error
    }
}

