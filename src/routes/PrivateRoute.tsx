import { Navigate } from "react-router-dom";
import { ROUTES } from "./RouteConstant";
import type { CustomRouteProps } from "../types/routeTypes";

export const PrivateRoute = ({ children }: CustomRouteProps) => {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <> {children}</>;
};
