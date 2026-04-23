import { LayoutDashboard, Notebook, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PAGE_HEADINGS, ROUTES } from "../../routes/RouteConstant";
import { useAppSelector, type AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../../modules/auth/auth.slice";
import { useEffect } from "react";

const useSidebarHelper = () => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: PAGE_HEADINGS.DASHBOARD,
      path: ROUTES.DASHBOARD,
    },
    {
      icon: Users,
      label: PAGE_HEADINGS.USER_MANAGEMENT,
      path: ROUTES.USER_MANAGEMENT,
    },
    {
      icon: Users,
      label: PAGE_HEADINGS.ROLES_AND_PERMISSIONS,
      path: ROUTES.ROLES_AND_PERMISSIONS,
    },
    { icon: Notebook, label: PAGE_HEADINGS.CMS_MANAGEMENT, path: ROUTES.CMS },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const userData = useAppSelector((state) => state.auth.admin);

  useEffect(() => {
    if (!userData?.email) {
      dispatch(getProfileDetails());
    }
  }, []);

  const isActive = (path: string) => {
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === ROUTES.DASHBOARD;
    }
    return location.pathname.startsWith(path);
  };
  return { isActive, menuItems, userData };
};

export default useSidebarHelper;
