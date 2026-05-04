import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/RouteConstant";
import hasPermission, { type PermissionAction } from "@/utils/permissions";
import { useAppSelector } from "@/redux/store";

interface RouteGuardProps {
  children: React.ReactNode;
  isPrivate?: boolean;
  hideAfterLogin?: boolean;
  module?:string,
  action?:PermissionAction
}

const RouteGuard = ({ children, isPrivate, hideAfterLogin,module,action }: RouteGuardProps) => {
  const loggedIn = !!localStorage.getItem("token");
    const userData = useAppSelector((state) => state.auth.admin);
    const permissions = userData.role?.permissions || [];
  
console.log(module,action,permissions,"module and action in guard");

  if (isPrivate && !loggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (hideAfterLogin && loggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
if (isPrivate && module && action) {
    const allowed = hasPermission(permissions, module, action);
    if (!allowed) {
      return <Navigate to={ROUTES.PROFILE} replace />;
    }
  }
    return <>{children}</>;

};

export default RouteGuard;