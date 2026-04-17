import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch, type RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import type { PaginatedQuery } from "../../../../interfaces/api.interface";
import { DEFAULT_PAGE_OPTIONS } from "../../../../internal/api.constant";
import { getOrganizationList } from "../organization.slices";
import { useNavigate } from "react-router-dom";

export const useOrganizationListHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({
    ...DEFAULT_PAGE_OPTIONS,
  });
  

  const handlePageOptionsChanged=(data:PaginatedQuery)=>{
    setPageOptions(data)
  }

  useEffect(()=>{
    dispatch(getOrganizationList(pageOptions))
  },[dispatch,pageOptions])

  const {organizationList,status,totalDocs}=useAppSelector((state:RootState)=>state.organizationManagement);
  return {handlePageOptionsChanged,organizationList,pageOptions,status,totalDocs,navigate}
};
