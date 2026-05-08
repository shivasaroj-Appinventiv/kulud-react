import { getProfileDetails } from "@/modules/auth/auth.slice";
import { useAppSelector, type AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAuthInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loggedIn = !!localStorage.getItem("token");
  const isPermissionsLoaded = useAppSelector((state)=>state.auth.isPermissionsLoaded);
  useEffect(() => {
    if (loggedIn && !isPermissionsLoaded) {
      dispatch(getProfileDetails());
    }
  }, []);
};

export default useAuthInit;
