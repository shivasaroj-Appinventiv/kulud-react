import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import type { AppDispatch } from "@/redux/store";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPermissions } from "../roles-and-permissions.slice";

const useAddEditRoleHelper=()=>{
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: PAGE_HEADINGS.ROLES_AND_PERMISSIONS,
      path: ROUTES.ROLES_AND_PERMISSIONS,
    },
    {
      title: PAGE_HEADINGS.EDIT_ROLE,
      path: ROUTES.EDIT_ROLES,
    },
  ];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(getPermissions());
  },[])

  // const formik = useFormik({
  //   initialValues:{
  //     name:"",
  //   }
  // })

  return {breadcrumbs};
}

export default useAddEditRoleHelper;