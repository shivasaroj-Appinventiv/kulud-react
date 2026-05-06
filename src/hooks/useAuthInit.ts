import { getProfileDetails } from "@/modules/auth/auth.slice";
import type { AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedIn = !!localStorage.getItem("token");
  useEffect(() => {
    if (loggedIn) {
      dispatch(getProfileDetails());
    }
  }, []);
};

export default useAuthInit;
