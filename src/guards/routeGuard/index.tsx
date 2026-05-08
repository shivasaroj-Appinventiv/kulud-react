import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/RouteConstant";
import hasPermission, { type PermissionAction } from "@/utils/permissions";
import { useAppSelector } from "@/redux/store";
import { FEATURE_SLUGS } from "@/constants/feature-slugs.enum";
import Loader from "@/components/loader";

interface RouteGuardProps {
  children: React.ReactNode;
  isPrivate?: boolean;
  hideAfterLogin?: boolean;
  module?: string;
  action?: PermissionAction;
}


const RouteGuard = ({ children, isPrivate, hideAfterLogin, module, action }: RouteGuardProps) => {
  const loggedIn = !!localStorage.getItem("token");
  const userData = useAppSelector((state) => state.auth.admin);
  const permissions = userData.role?.permissions || [];
  const isPermissionsLoaded= useAppSelector((state)=>state.auth.isPermissionsLoaded);

  if (isPrivate && !loggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (hideAfterLogin && loggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  if (isPrivate && module && action && !isPermissionsLoaded) {
    return <Loader />;
  }

  if (isPrivate && module && action && userData.userType != "ADMIN") {
    const allowed = hasPermission(permissions, module, action);
    if (!allowed) {
      // Try dashboard first, fall back to profile (no permission needed)
      const canSeeDashboard = hasPermission(permissions, FEATURE_SLUGS.DASHBOARD, "view");
      return <Navigate to={canSeeDashboard ? ROUTES.DASHBOARD : ROUTES.PROFILE} replace />;
    }
  }

  return <>{children}</>;
};

export default RouteGuard;
