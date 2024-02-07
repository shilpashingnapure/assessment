import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

export const PrivateRoute = ()=>{
    const [isLoggedIn, setLoggedIn] = useState(false);

    let navigate = useNavigate()
  useEffect(() => {
    getToken();
  }, []);

  function getToken() {
    const token = Cookies.get("token");

    console.log(token)
    if (token) { 
        return navigate('/feed')
      
    } else {
        return navigate('/login')
     
    }

  }

}