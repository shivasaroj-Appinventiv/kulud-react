import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/RouteConstant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { forgotPassword } from "../auth.slice";

const useForgotPasswordHelper = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleBackToLogin = () => {
    navigate(ROUTES.LOGIN);
  };
  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }
    setError("");
    
    try {
        const response= await dispatch(forgotPassword({email})).unwrap();
        localStorage.setItem("email",email);
        localStorage.setItem("userId",response);
        navigate(ROUTES.VERIFY_OTP);        
    } catch (error) {
        
    }
  };
  return {handleSubmit,handleBackToLogin,error,setEmail,email};
};

export default useForgotPasswordHelper;