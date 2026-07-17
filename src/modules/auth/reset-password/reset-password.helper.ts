import * as Yup from "yup";
import { PASSWORD_PATTERN } from "../../../constants/patterns";
import { useFormik } from "formik";
import type { AppDispatch } from "../../../redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Messages } from "../../../constants/messages";
import { resetPassword } from "../auth.slice";
import { ROUTES } from "../../../routes/RouteConstant";

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required")
    .matches(PASSWORD_PATTERN, Messages.passwordPattern),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters")
    .required("Password is required")
    .matches(PASSWORD_PATTERN, Messages.passwordPattern)
    .oneOf(
      [Yup.ref("password")],
      "Password and Confirm Password should be same",
    ),
});

const useResetPasswordHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    setSessionToken(sessionToken);
    if (!sessionToken) {
      navigate(ROUTES.LOGIN);
    }
  }, []);
  const handleSubmit = async () => {
    const values = formik.values;
    try {
      await dispatch(
        resetPassword({
          password: values.password,
          confirmPassword: values.confirmPassword,
          sessionToken,
        }),
      ).unwrap();
      localStorage.removeItem("userId");
      navigate(ROUTES.LOGIN);
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: handleSubmit,
  });

  return {
    formik,
    showConfirmPassword,
    showPassword,
    setConfirmShowPassword,
    setShowPassword,
  };
};

export default useResetPasswordHelper;
