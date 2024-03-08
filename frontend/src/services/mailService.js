import axios from "axios";

export const forgotPassword = (email,callback)=>{
    axios.post(`${process.env.REACT_APP_FORGOT_PASSWORD_API}`,email)
        .then((res) => callback(res))
        .catch((err) => callback(err));
}

export const resetPassword = (newPassword,token,callback)=>{
    const headers= {
        authorization:`Bearer ${token}`
    }
    axios.post(`${process.env.REACT_APP_RESET_PASSWORD_API}`,newPassword,{headers})
    .then((res) => callback(res))
    .catch((err) => callback(err));
}