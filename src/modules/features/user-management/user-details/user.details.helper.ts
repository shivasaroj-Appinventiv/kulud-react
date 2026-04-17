import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { getUserDetails } from "../user.slice";

export const useUserDetailsHelper = (userId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, []);
  const details = useAppSelector((state) => state.userManagement.details);
  return {details};
};
