import Cookies from "js-cookie";

export const setCookies = (data)=>{
    Cookies.set("token", data.token, { expires: 7, secure: true });
    Cookies.set("_id" , data.user._id , { expires : 7 , secure : true});   
}

