import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import { getPermissions, getRoleDetails } from "../roles-and-permissions.slice";
import { useAppSelector, type AppDispatch } from "@/redux/store";

export const useAddEditRoleHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSaveDialog, setOpenSavelDialog] = useState(false);
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
  useEffect(()=>{
    dispatch(getPermissions());
  },[])
  const toggleCancelDialog = () => {
    setOpenCancelDialog((prev) => !prev);
  };

  const toggleSaveDialog = () => {
    setOpenSavelDialog((prev) => !prev);
  };

  const permissionsList = useAppSelector(
    (state) => state.permissionsSlice.permissions,
  );
  const roleDetails = useAppSelector((state) => state.permissionsSlice.details);



  useEffect(() => {
    if (id) {
      dispatch(getRoleDetails( id ));
    }
  }, [id]);

  const transformPermissions = (data: any[], selectedIds: string[] = []) => {
    if (!data || data.length === 0) return [];

    const grouped: any = {};

    data.forEach((item: any) => {
      if (!grouped[item.module]) {
        grouped[item.module] = {
          module: item.module,
          view: null,
          edit: null,
        };
      }
      // debugger
      grouped[item.module][item.action] = {
        id: item.id,
        checked: selectedIds.includes(item.id),
      };
    });

    return Object.values(grouped);
  };

  return {
    permissionsList,
    transformPermissions,
    id,
    dispatch,
    roleDetails,
    navigate,
    openCancelDialog,
    toggleCancelDialog,
    openSaveDialog,
    toggleSaveDialog,
    breadcrumbs
  };
};
