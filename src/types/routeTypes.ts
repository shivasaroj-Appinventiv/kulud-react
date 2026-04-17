import type { ReactNode } from "react";

export interface Route {
  name: string;
  path: string;
  id: number;
  isPrivate: boolean;
  component: ReactNode | any;
  Layout?: React.FC<{ children: ReactNode }>;
  hideAfterLogin?: boolean;
  pageProp?: { page: string };
}


export type CustomRouteProps = {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  hideAfterLogin?: boolean;
};