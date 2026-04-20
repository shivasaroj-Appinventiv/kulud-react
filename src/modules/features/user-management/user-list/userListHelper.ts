import { useDispatch } from "react-redux";
import {
  useAppSelector,
  type AppDispatch,
  type RootState,
} from "../../../../redux/store";
import { useEffect, useState } from "react";
import type { PaginatedQuery } from "../../../../interfaces/api.interface";
import { DEFAULT_PAGE_OPTIONS } from "../../../../internal/api.constant";
import { useNavigate } from "react-router-dom";
import { getUsersList } from "../user.slice";
import { ROUTES } from "../../../../routes/RouteConstant";
import type { BreadCrumbType } from "../../../../components/breadcrumb/breadcrumb.helper";

export const useUserListHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({
    ...DEFAULT_PAGE_OPTIONS,
  });
  const breadcrumbs: BreadCrumbType[] = [
    { title: "User Management", path: ROUTES.USER_MANAGEMENT },
  ];
  const onEdit = (row: any) => {
    // navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
  };
  const onDetails = (row: any) => {
    navigate(ROUTES.GET_USER_DETAILS(row.id));
  };

  const handlePageOptionsChanged = (data: PaginatedQuery) => {
    data= {...data,...data.filters};
    delete data.filters
    setPageOptions(data);
  };

  useEffect(() => {
    dispatch(getUsersList(pageOptions));
  }, [dispatch, pageOptions]);

  const { usersList, status, totalDocs } = useAppSelector(
    (state: RootState) => state.userManagement,
  );
  const isLoading = status === "loading"; 

  const [filters, setFilters] = useState({
    status: [],
    createdFrom: "",
    createdTo: "",
  });

  const [showFilter, setShowFilter] = useState(false);
 

  const handleApplyFilter = (values: any) => {
    setFilters(values);
    
    handlePageOptionsChanged({ ...pageOptions, page: 1,  filters:{ ...values, status:values.status.join(',')} });
    setIsFilterApplied(true);
    setShowFilter(false);
  };
  const handleCloseFilter = () => {
    setShowFilter(false);
  };
  const handleToggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  return {
    handlePageOptionsChanged,
    usersList,
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
    isLoading
  };
};
