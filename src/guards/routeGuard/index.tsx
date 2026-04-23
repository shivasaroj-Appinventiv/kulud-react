import { Navigate } from "react-router-dom";
import { ROUTES } from "@/routes/RouteConstant";

interface RouteGuardProps {
  children: React.ReactNode;
  isPrivate?: boolean;
  hideAfterLogin?: boolean;
}

const RouteGuard = ({ children, isPrivate, hideAfterLogin }: RouteGuardProps) => {
  const loggedIn = !!localStorage.getItem("token");

  if (isPrivate && !loggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (hideAfterLogin && loggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default RouteGuard;