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

export const useUserListHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({
    ...DEFAULT_PAGE_OPTIONS,
  });
  const onEdit = (row: any) => {
    // navigate(ROUTES.EDIT_ORGANIZATION_DETAILS(row._id));
  };
  const onDetails = (row: any) => {
    navigate(ROUTES.GET_USER_DETAILS(row.id));
  };

  const handlePageOptionsChanged = (data: PaginatedQuery) => {
    setPageOptions(data);
  };

  useEffect(() => {
    dispatch(getUsersList(pageOptions));
  }, [dispatch, pageOptions]);

  const { usersList, status, totalDocs } = useAppSelector(
    (state: RootState) => state.userManagement,
  );
  return {
    handlePageOptionsChanged,
    usersList,
    pageOptions,
    status,
    totalDocs,
    navigate,
    onEdit,
    onDetails
  };
};
