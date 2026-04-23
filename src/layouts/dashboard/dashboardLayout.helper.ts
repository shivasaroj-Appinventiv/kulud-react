import { useState } from "react";
import { useAppSelector, type AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/auth/auth.slice";
import { openDialog } from "../../redux/slices/global.slice";
import { ROUTES } from "../../routes/RouteConstant";

const useDashboardLayoutHelper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = useAppSelector((state) => state.auth.admin);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const navigateToProfile = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleLogout =  () => {
    dispatch(logout()).unwrap();
   
  };

  const onLogoutClick = () => {
    handleMenuClose();
    dispatch(
      openDialog({
        open: true,
        title: "Confirm Logout",
        message: "Are you sure you want to logout?",
        onConfirm: handleLogout,
      }),
    );
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    handleMenuOpen,
    userData,
    openProfileMenu,
    anchorEl,
    handleMenuClose,
    navigateToProfile,
    onLogoutClick,
  };
};
export default useDashboardLayoutHelper;
