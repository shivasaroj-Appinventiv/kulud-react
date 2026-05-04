import { LayoutDashboard, Notebook, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PAGE_HEADINGS, ROUTES } from "../../routes/RouteConstant";
import { useAppSelector, type AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../../modules/auth/auth.slice";
import { useEffect } from "react";
import { FEATURE_SLUGS } from "@/constants/feature-slugs.enum";
import hasPermission from "@/utils/permissions";

const useSidebarHelper = () => {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: PAGE_HEADINGS.DASHBOARD,
      isVisible: true,
      feature: FEATURE_SLUGS.DASHBOARD,
      path: ROUTES.DASHBOARD,
    },
    {
      icon: Users,
      label: PAGE_HEADINGS.USER_MANAGEMENT,
      feature: FEATURE_SLUGS.USER,
      isVisible: true,
      path: ROUTES.USER_MANAGEMENT,
    },
    {
      icon: Users,
      label: PAGE_HEADINGS.ROLES_AND_PERMISSIONS,
      isVisible: true,
      feature: FEATURE_SLUGS.ROLES,
      path: ROUTES.ROLES_AND_PERMISSIONS,
    },
    {
      icon: Notebook,
      isVisible: true,
      label: PAGE_HEADINGS.CMS_MANAGEMENT,
      feature: FEATURE_SLUGS.CMS,
      path: ROUTES.CMS,
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const userData = useAppSelector((state) => state.auth.admin);
  const permissions = userData.role?.permissions || [];
  const filteredMenus = menuItems.filter((item)=>hasPermission(permissions,item.feature,"view"))

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
  return { isActive, menuItems:filteredMenus, userData };
};

export default useSidebarHelper;
