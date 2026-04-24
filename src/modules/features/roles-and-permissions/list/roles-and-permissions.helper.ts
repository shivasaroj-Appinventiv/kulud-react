import {
  useAppSelector,
  type AppDispatch,
  type RootState,
} from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getRoles,
  setParams,
  updateRole,
} from "../roles-and-permissions.slice";
import { DEFAULT_PAGE_OPTIONS } from "@/internal/api.constant";
import type { PaginatedQuery } from "@/interfaces/api.interface";
import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import { useNavigate } from "react-router-dom";
import { COMMON_MESSAGES } from "@/constants/messages";
import { STATUS_TYPE_VALUE } from "@/constants/constant";
import { openDialog } from "@/redux/slices/global.slice";
import type { Role } from "../role-and-permissions.interface";

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
  const onEdit = (row: Role) => {
    navigate(ROUTES.GET_EDIT_ROLES(row.id));
  };
  const onDetails = (row: any) => {
    navigate(ROUTES.GET_ROLES_DETAILS(row.id));
  };

  useEffect(() => {
    dispatch(getRoles(pageOptions));
    return () => {
      // dispatch(resetParams({}));
    };
  }, [dispatch, pageOptions]);

  const { totalDocs, roles } = useAppSelector(
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

  const updateStatus = async (data: { roleId: string; status: string }) => {
    dispatch(setParams(pageOptions));
    const res = await dispatch(updateRole(data)).unwrap();
    dispatch(getRoles(pageOptions));
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
