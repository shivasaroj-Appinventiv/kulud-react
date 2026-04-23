
import { LayoutDashboard, Notebook, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/RouteConstant";
import { useAppSelector, type AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getProfileDetails } from "../../modules/auth/auth.slice";
import { useEffect } from "react";

const useSidebarHelper = () =>{
      const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: ROUTES.DASHBOARD },
    { icon: Users, label: "User Management", path: ROUTES.USER_MANAGEMENT },
    { icon: Notebook, label: "CMS Management", path: ROUTES.CMS },
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
    return {isActive,menuItems,userData};
}

export default useSidebarHelper;