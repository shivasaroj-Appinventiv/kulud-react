import { useDispatch } from "react-redux";
import { useAppSelector, type AppDispatch } from "../../../../redux/store";
import { useEffect } from "react";
import { getUserDetails, updateUserStatus } from "../user.slice";
import { useParams } from "react-router-dom";
import type { BreadCrumbType } from "../../../../components/breadcrumb/breadcrumb.helper";
import { ROUTES } from "../../../../routes/RouteConstant";
import { COMMON_MESSAGES } from "../../../../constants/messages";
import { STATUS_TYPE_VALUE } from "../../../../constants/constant";
import type { User } from "../user-management.interfaces";
import { DialogActionBtn } from "../../../../constants/dialog-btn.enum";
import { openDialog } from "../../../../redux/slices/global.slice";

export const useUserDetailsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const breadcrumbs: BreadCrumbType[] = [
    { title: "User Management", path: ROUTES.USER_MANAGEMENT },
    { title: "User Details", path: ROUTES.USER_MANAGEMENT },
  ];

  const getUserDetailsFromId = () => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  };
  useEffect(() => {
    getUserDetailsFromId();
  }, [id, dispatch]);

  const updateStatusOnConfirmation = async (data: { userId: string; type: string }) => {
    const res = await dispatch(updateUserStatus(data)).unwrap();

    getUserDetailsFromId();
  };
  
  const details = useAppSelector((state) => state.userManagement.details);

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

    console.log(data.title);
    
    dispatch(
      openDialog({
        title:data.title,
        open: true,
        message: data.headerText,
        onConfirm: () => {
          void updateStatusOnConfirmation({ userId, type });
        },
      }),
    );
  };
  return { details, breadcrumbs, onStatusUpdate };
};
