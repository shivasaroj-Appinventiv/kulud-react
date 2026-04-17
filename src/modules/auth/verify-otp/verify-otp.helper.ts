import { ROUTES } from "../../../routes/RouteConstant";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../redux/store";
import { verifyOTP } from "../auth.slice";

const userVerifyOTPHelper = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
    const [email,setEmail]=useState<string|null>(null);
    useEffect(()=>{
      const email = localStorage.getItem("email");
      setEmail(email);
      if(!email){
        navigate(ROUTES.LOGIN);
      }
    },[]);
  const validateOtp = () => {
    if (!otp) {
      return "OTP is required";
    }
    if (otp.length < 6) {
      return "Enter complete 6-digit OTP";
    }
    if (!/^\d+$/.test(otp)) {
      return "OTP must be numeric";
    }
    return "";
  };

  // ✅ Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const validationError = validateOtp();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    const payload = {
      otp: otp,
      email: email,
    };
    try {
      const response = await dispatch(verifyOTP(payload)).unwrap();
      console.log(response);
      localStorage.removeItem("email");
      localStorage.setItem("sessionToken",response.sessionToken)
      navigate(ROUTES.RESET_PASSWORD);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const handleBackToLogin = () => {
    navigate(ROUTES.LOGIN);
  };

  return {
    handleBackToLogin,
    handleSubmit,
    loading,
    setOtp,
    error,
    setError,
    otp,
  };
};

export default userVerifyOTPHelper;
