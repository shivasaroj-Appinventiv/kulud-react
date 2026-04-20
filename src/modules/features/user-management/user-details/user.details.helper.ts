import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { getUserDetails } from "../user.slice";
import { useParams } from "react-router-dom";
import type { BreadCrumbType } from "../../../../components/breadcrumb/breadcrumb.helper";
import { ROUTES } from "../../../../routes/RouteConstant";

export const useUserDetailsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const breadcrumbs:BreadCrumbType[] = [
    {title:'User Management',path:ROUTES.USER_MANAGEMENT},
    {title:'User Details',path:ROUTES.USER_MANAGEMENT}
  ];
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch]);
  const details = useAppSelector((state) => state.userManagement.details);
  return { details,breadcrumbs };
};
