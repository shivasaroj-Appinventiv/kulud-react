import {
  useAppSelector,
  type AppDispatch,
  type RootState,
} from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getPermissions, getRoles } from "../roles-and-permissions.slice";
import { DEFAULT_PAGE_OPTIONS } from "@/internal/api.constant";
import type { PaginatedQuery } from "@/interfaces/api.interface";
import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import { useNavigate } from "react-router-dom";
import { COMMON_MESSAGES } from "@/constants/messages";
import { STATUS_TYPE_VALUE } from "@/constants/constant";
import { DialogActionBtn } from "@/constants/dialog-btn.enum";
import { openDialog } from "@/redux/slices/global.slice";
import type { PermissionGroup, Role } from "../role-and-permissions.interface";

const useRolesAndPermissionsHelper = () => {
  const permissionList: any[] = ["sdsds"];
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({
    ...DEFAULT_PAGE_OPTIONS,
  });
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const breadcrumbs: BreadCrumbType[] = [
    {
      title: PAGE_HEADINGS.ROLES_AND_PERMISSIONS,
      path: ROUTES.ROLES_AND_PERMISSIONS,
    },
  ];
  const onEdit = (row: any) => {
    // navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
  };
  const onDetails = (row: any) => {
    navigate(ROUTES.GET_USER_DETAILS(row.id));
  };

  useEffect(() => {
    dispatch(getRoles(pageOptions));
    return () => {
      // dispatch(resetParams({}));
    };
  }, [dispatch, pageOptions]);

  const { totalDocs,roles } = useAppSelector(
    (state: RootState) => state.permissionsSlice,
  );


  const params = useAppSelector(
    (state: RootState) => state.userManagement.params,
  );
  const isLoading = status === "loading";

  const [filters, setFilters] = useState({
    status: [],
    createdFrom: "",
    createdTo: "",
  });

  const [showFilter, setShowFilter] = useState(false);


  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const updateStatus = async (data: { userId: string; type: string }) => {
    // dispatch(setParams(pageOptions));
    // const res = await dispatch(updateUserStatus(data)).unwrap();
    // dispatch(getUsersList(pageOptions));
  };
  const onStatusUpdate = (role: Role) => {
    // const type =
    //   role.status === STATUS_TYPE_VALUE.ACTIVE ? "deactivate" : "activate";
    // const userId = role.id;

    // const data = {
    //   title:
    //     role.status === STATUS_TYPE_VALUE.ACTIVE
    //       ? COMMON_MESSAGES.DEACTIVATED.title("User")
    //       : COMMON_MESSAGES.ACTIVATED.title("User"),
    //   headerText:
    //     role.status === STATUS_TYPE_VALUE.ACTIVE
    //       ? COMMON_MESSAGES.ACCESS("restricted")
    //       : COMMON_MESSAGES.ACCESS("restored"),
    //   submitButtonText:
    //     role.status === STATUS_TYPE_VALUE.ACTIVE
    //       ? DialogActionBtn.DEACTIVATE
    //       : DialogActionBtn.ACTIVATE,
    //   cancelButtonText: DialogActionBtn.CANCEL,
    // };
    // dispatch(
    //   openDialog({
    //     open: true,
    //     message: data.headerText,
    //     onConfirm: () => {
    //       void updateStatus({ userId, type });
    //     },
    //     title: "",
    //   }),
    // );
  };

  const pageOptionsRef = useRef<PaginatedQuery>(pageOptions);

  useEffect(() => {
    pageOptionsRef.current = pageOptions;
  }, [pageOptions]);

  const handlePageOptionsChanged = (data: PaginatedQuery) => {
    const { filters, ...rest } = data;
    const merged = filters ? { ...rest, ...filters } : rest;
    pageOptionsRef.current = merged; // sync ref immediately
    setPageOptions(merged);
  };

  const handleApplyFilter = (values: any) => {
    setFilters(values);

    const isEmpty =
      values.status.length === 0 && !values.createdFrom && !values.createdTo;

    setIsFilterApplied(!isEmpty); // ✅ correctly tracks filter state

    handlePageOptionsChanged({
      ...pageOptionsRef.current, // ✅ never stale
      page: 1,
      filters: { ...values, status: values.status.join(",") },
    });

    setShowFilter(false);
  };
  return {
    handlePageOptionsChanged,
    permissionList,
    roles,
    pageOptions,
    status,
    totalDocs,
    navigate,
    onEdit,
    onDetails,
    breadcrumbs,
    showFilter,
    handleToggleFilter,
    handleCloseFilter,
    handleApplyFilter,
    isFilterApplied,
    filters,
    isLoading,
    onStatusUpdate,
  };
};

export default useRolesAndPermissionsHelper;
