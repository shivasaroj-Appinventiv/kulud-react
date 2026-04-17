import { ROUTES } from "./RouteConstant";
import { Navigate } from "react-router-dom";
import type { CustomRouteProps } from "../types/routeTypes";

export const PublicRoute = ({ hideAfterLogin, children }: CustomRouteProps) => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  if (!!hideAfterLogin && isLoggedIn) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }
  return <> {children}</>;
};
