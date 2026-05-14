import { useAppSelector, type AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getRoleDetails,
  resetRoleDetails,
  updateRole,
} from "../roles-and-permissions.slice";
import { useParams } from "react-router-dom";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import { STATUS_TYPE_VALUE } from "@/constants/constant";
import type { Role } from "../role-and-permissions.interface";
import { COMMON_MESSAGES } from "@/constants/messages";
import { openDialog } from "@/redux/slices/global.slice";

const useRoleDetailsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const breadcrumbs: BreadCrumbType[] = [
    {
      title: PAGE_HEADINGS.ROLES_AND_PERMISSIONS,
      path: ROUTES.ROLES_AND_PERMISSIONS,
    },
    {
      title: PAGE_HEADINGS.ROLES_DETAILS,
      path: ROUTES.ROLES_DETAILS,
    },
  ];
  const { roleDetails, loading } = useAppSelector(
    (state) => state.permissionsSlice,
  );

  const getDetails = () => {
    dispatch(getRoleDetails(id || ""));
    
  };


  useEffect(() => {
    getDetails();
    
    return () => {
      dispatch(resetRoleDetails());
    };
  }, [dispatch, id]);

  const permissions = groupPermissions(roleDetails?.permissions || []);

  const updateStatus = async (data: { roleId: string; status: string }) => {
    const res = await dispatch(updateRole(data)).unwrap();
    getDetails();
  };
  const onStatusUpdate = (role: Role) => {
    const status =
      role.status === STATUS_TYPE_VALUE.ACTIVE ? "INACTIVE" : "ACTIVE";
    const roleId = role.id;

    const data = {
      title:
        role.status === STATUS_TYPE_VALUE.ACTIVE
          ? COMMON_MESSAGES.DEACTIVATED.title("Role")
          : COMMON_MESSAGES.ACTIVATED.title("Role"),
      headerText:
        role.status === STATUS_TYPE_VALUE.ACTIVE
          ? COMMON_MESSAGES.DEACTIVATED.confirm("Deactivate", false, "role")
          : COMMON_MESSAGES.ACTIVATED.confirm("Activate", false, "role"),
    };
    dispatch(
      openDialog({
        open: true,
        message: data.headerText,
        onConfirm: () => {
          void updateStatus({ roleId, status });
        },
        title: "",
      }),
    );
  };

  return { permissions, roleDetails, loading, breadcrumbs, onStatusUpdate };
};

export default useRoleDetailsHelper;
const groupPermissions = (permissions: any[]) => {
  const map: Record<string, any> = {};

  permissions.forEach((p) => {
    if (!map[p.module]) {
      map[p.module] = {
        module: p.module,
        view: false,
        edit: false,
      };
    }

    if (p.action === "view") map[p.module].view = true;
    if (p.action === "edit") map[p.module].edit = true;
  });

  return Object.values(map);
};
