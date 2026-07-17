import { useDispatch } from "react-redux";
import {
  useAppSelector,
  type AppDispatch,
  type RootState,
} from "../../../../redux/store";
import { useEffect, useRef, useState } from "react";
import type { PaginatedQuery } from "../../../../interfaces/api.interface";
import { DEFAULT_PAGE_OPTIONS } from "../../../../internal/api.constant";
import { useNavigate } from "react-router-dom";
import {
  getUsersList,
  resetParams,
  setParams,
  updateUserStatus,
} from "../user.slice";
import { ROUTES } from "../../../../routes/RouteConstant";
import type { BreadCrumbType } from "../../../../components/breadcrumb/breadcrumb.helper";
import type { User } from "../user-management.interfaces";
import { COMMON_MESSAGES } from "../../../../constants/messages";
import { DialogActionBtn } from "../../../../constants/dialog-btn.enum";
import { STATUS_TYPE_VALUE } from "../../../../constants/constant";
import { openDialog } from "../../../../redux/slices/global.slice";

export const useUserListHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({
    ...DEFAULT_PAGE_OPTIONS,
  });
  const breadcrumbs: BreadCrumbType[] = [
    { title: "User Management", path: ROUTES.USER_MANAGEMENT },
  ];
  const onEdit = () => {
    // navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
  };
  const onDetails = (row: any) => {
    navigate(ROUTES.GET_USER_DETAILS(row.id));
  };

  // const handlePageOptionsChanged = (data: PaginatedQuery) => {
  //   data = { ...data, ...data.filters };
  //   delete data.filters;
  //   setPageOptions(data);
  //   dispatch(setParams(data));
  // };

  useEffect(() => {
    dispatch(getUsersList(pageOptions));
    return () => {
      dispatch(resetParams());
    };
  }, [dispatch, pageOptions]);

  const { usersLists, status, totalDocs } = useAppSelector(
    (state: RootState) => state.userManagement,
  );
  const isLoading = status === "loading";

  const [filters, setFilters] = useState({
    status: [],
    createdFrom: "",
    createdTo: "",
  });

  const [showFilter, setShowFilter] = useState(false);

  // const handleApplyFilter = (values: any) => {
  //   setFilters(values);

  //   handlePageOptionsChanged({
  //     ...pageOptions,
  //     page: 1,
  //     filters: { ...values, status: values.status.join(",") },
  //   });
  //   setIsFilterApplied(true);
  //   setShowFilter(false);
  // };
  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const updateStatus = async (data: { userId: string; type: string }) => {
    dispatch(setParams(pageOptions));
    await dispatch(updateUserStatus(data)).unwrap();
    dispatch(getUsersList(pageOptions));
  };
  const onStatusUpdate = (userData: User) => {
    const type =
      userData.status === STATUS_TYPE_VALUE.ACTIVE ? "deactivate" : "activate";
    const userId = userData.id;

    const data = {
      title:
        userData.status === STATUS_TYPE_VALUE.ACTIVE
          ? COMMON_MESSAGES.DEACTIVATED.title("User")
          : COMMON_MESSAGES.ACTIVATED.title("User"),
      headerText:
        userData.status === STATUS_TYPE_VALUE.ACTIVE
          ? COMMON_MESSAGES.ACCESS("restricted")
          : COMMON_MESSAGES.ACCESS("restored"),
      submitButtonText:
        userData.status === STATUS_TYPE_VALUE.ACTIVE
          ? DialogActionBtn.DEACTIVATE
          : DialogActionBtn.ACTIVATE,
      cancelButtonText: DialogActionBtn.CANCEL,
    };
    dispatch(
      openDialog({
        open: true,
        message: data.headerText,
        onConfirm: () => {
          void updateStatus({ userId, type });
        },
        title: ""
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
  pageOptionsRef.current = merged;   // sync ref immediately
  setPageOptions(merged);
};

const handleApplyFilter = (values: any) => {
  setFilters(values);

  const isEmpty =
    values.status.length === 0 && !values.createdFrom && !values.createdTo;

  setIsFilterApplied(!isEmpty); // ✅ correctly tracks filter state

  handlePageOptionsChanged({
    ...pageOptionsRef.current,   // ✅ never stale
    page: 1,
    filters: { ...values, status: values.status.join(",") },
  });

  setShowFilter(false);
};
  return {
    handlePageOptionsChanged,
    usersLists,
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
