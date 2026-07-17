import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../../routes/RouteConstant";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../auth.slice";
import { EMAIL, PASSWORD_PATTERN } from "../../../constants/patterns";
import { Messages } from "../../../constants/messages";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .matches(EMAIL, "Invalid email format")
    .max(255, "Email must be at most 255 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required")
    .matches(
      PASSWORD_PATTERN,
      Messages.passwordPattern,
    ),
});
const useLoginHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const payloadToSend = {
      email: formik.values.email,
      password: formik.values.password,
    };

    const response = await dispatch(login(payloadToSend)).unwrap();
    localStorage.setItem("token", response.data.data.accessToken);
    navigate(ROUTES.DASHBOARD);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleLogin,
  });

  const handleForgotPassword = () => {
    navigate(ROUTES.FORGOT_PASSWORD);
  };

  return {formik,handleForgotPassword,handleLogin,showPassword,setShowPassword};
};

export default useLoginHelper;

