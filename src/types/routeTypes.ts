import type { ReactNode } from "react";

export interface AppRoute {
  path: string;
  element?: ReactNode;
  children?: AppRoute[];
  hideAfterLogin?:boolean
  // Guards
  isPrivate?: boolean;
  roles?: string[];
  permissions?: string[];

  // Layout
  Layout?: React.ComponentType<any>;

  // Optional meta
  name?: string;
}

export type CustomRouteProps = {
  children: React.ReactNode;
  isLoggedIn?: boolean;
  hideAfterLogin?: boolean;
};
