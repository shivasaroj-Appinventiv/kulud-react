import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { getUserDetails } from "../user.slice";
import { useParams } from "react-router-dom";

export const useUserDetailsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch]);
  const details = useAppSelector((state) => state.userManagement.details);
  return { details };
};
