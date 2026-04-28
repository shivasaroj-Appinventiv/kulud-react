import type { BreadCrumbType } from "@/components/breadcrumb/breadcrumb.helper";
import {
  useAppSelector,
  type AppDispatch,
  type RootState,
} from "@/redux/store";
import { PAGE_HEADINGS, ROUTES } from "@/routes/RouteConstant";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  createUser,
  getUserDetails,
  setUserDetails,
  updateUser,
} from "../user.slice";
import { useFormik } from "formik";
import {
  getBranchesForDropDown,
  getRolesForDropDown,
} from "../../roles-and-permissions/roles-and-permissions.slice";
import type { CreateUser } from "../user-management.interfaces";
import { userValidationSchema } from "@/schemas";

const useAddEditUserHelper = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [roles, setRoles] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);

  const details = useAppSelector(
    (state: RootState) => state.userManagement.details,
  );

  const breadcrumbs: BreadCrumbType[] = useMemo(
    () => [
      {
        title: PAGE_HEADINGS.USER_MANAGEMENT,
        path: ROUTES.USER_MANAGEMENT,
      },
      id
        ? {
            title: PAGE_HEADINGS.EDIT_USER,
            path: ROUTES.STATIC_EDIT_USER,
          }
        : {
            title: PAGE_HEADINGS.ADD_USER,
            path: ROUTES.Add_USER,
          },
    ],
    [id],
  );

  const handleSubmit = async (values: CreateUser) => {
    try {
      if (id) {
        const payload = { ...values, id };
        await dispatch(updateUser(payload)).unwrap();
      } else {
        await dispatch(createUser(values)).unwrap();
      }
      navigate(ROUTES.USER_MANAGEMENT);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: details?.fullName || "",
      email: details?.email || "",
      profilePicture:
        details?.profilePicture ||
        "profile/Screenshot from 2026-04-19 15-56-51.png",
      roleId: details?.roleId || "",
      countryCode: details?.countryCode || "91",
      phone: details?.phone || "",
      contactPersonPhone: details?.contactPersonPhone || "",
      branchId: details?.branchId || "",
    },
    validationSchema: userValidationSchema,
    onSubmit: handleSubmit,
  });

  // Fetch dropdown data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await dispatch(getRolesForDropDown()).unwrap();

        const branchRes = await dispatch(getBranchesForDropDown()).unwrap();

        setRoles(rolesRes || []);
        setBranches(branchRes || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [dispatch]);

  // Fetch edit details
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    } else {
      dispatch(setUserDetails(null)); // ✅ CLEAR OLD DATA
    }
  }, [id, dispatch]);

  const handleCancel = () => {
    navigate(ROUTES.USER_MANAGEMENT);
  };

  return {
    breadcrumbs,
    formik,
    roles,
    branches,
    handleCancel,
    id,
  };
};

export default useAddEditUserHelper;
