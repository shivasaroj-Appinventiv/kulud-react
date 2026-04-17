import { lazy } from "react";
import AuthLayout from "../layouts/AuthLayout";
import type { Route } from "../types/routeTypes";
import { PAGE_HEADINGS, ROUTES } from "./RouteConstant";
import DashboardLayout from "../layouts/DashboardLayout";
const Login = lazy(() => import("../modules/auth/login"));
const Dashboard = lazy(() => import("../modules/features/Dashboard"));
const Organizations = lazy(() => import("../modules/features/organization-management/organization-list"));
const ForgotPassword = lazy(() => import("../modules/auth/forgot-password"));
const VerifyOTP = lazy(()=>import("../modules/auth/verify-otp"));
const OrganizationDetails  = lazy (()=>import("../modules/features/organization-management/Organization-Details/"))
const EditOrganizationDetails = lazy(()=>import("../modules/features/organization-management/Edit-Organization"))
const Profile = lazy(()=>import("../modules/features//my-profile"));
const ResetPassword = lazy(()=>import("../modules/auth/reset-password"));
const UserManagement = lazy(()=>import("../modules/features//user-management/user-list"))
const UserDetails = lazy(()=>import("../modules/features//user-management/user-details"))

const config: Omit<Route, "id">[] = [
  {
    name: PAGE_HEADINGS.LOGIN,
    path: ROUTES.LOGIN,
    component: Login,
    Layout: AuthLayout,
    isPrivate: false,
    hideAfterLogin: true,
  },
  {
    name: PAGE_HEADINGS.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    component: ForgotPassword,
    Layout: AuthLayout,
    isPrivate: false,
    hideAfterLogin: true,
  },
  {
    name:PAGE_HEADINGS.RESET_PASSWORD,
    path:ROUTES.RESET_PASSWORD,
    Layout:AuthLayout,
    isPrivate:false,
    hideAfterLogin:true,
    component:ResetPassword,
  },
  {
    name:PAGE_HEADINGS.VERIFY_OTP,
    path:ROUTES.VERIFY_OTP,
    component:VerifyOTP,
    Layout:AuthLayout,
    isPrivate:false,
    hideAfterLogin:true,
  },
  {
    name: PAGE_HEADINGS.DASHBOARD,
    path: ROUTES.DASHBOARD,
    component: Dashboard,
    Layout: DashboardLayout,
    isPrivate: true,
  },
  {
    name:PAGE_HEADINGS.PROFILE,
    path:ROUTES.PROFILE,
    component:Profile,
    Layout:DashboardLayout,
    isPrivate:true,
  },
  {
    name: PAGE_HEADINGS.ORGANIZATION,
    path: ROUTES.ORGANIZATIONS,
    component: Organizations,
    Layout: DashboardLayout,
    isPrivate: true,
  },
    {
    name:PAGE_HEADINGS.ORGANIZATION_DETAILS,
    path:ROUTES.ORGANIZATIONS_DETAILS,
    component:OrganizationDetails,
    Layout:DashboardLayout,
    isPrivate:true
  },

    {
    name:PAGE_HEADINGS.EDIT_ORGANIZATION_DETAILS,
    path:ROUTES.EDIT_ORGANIZATIONS_DETAILS,
    component:EditOrganizationDetails,
    Layout:DashboardLayout,
    isPrivate:true
  },
  {
    name:PAGE_HEADINGS.USER_MANAGEMENT,
    path:ROUTES.USER_MANAGEMENT,
    component:UserManagement,
    Layout:DashboardLayout,
    isPrivate:true
  },
  {
    name:PAGE_HEADINGS.USER_DETAILS,
    path:ROUTES.USER_DETAILS_,
    component:UserDetails,
    Layout:DashboardLayout,
    isPrivate:true
  }
];

export const PAGE_ROUTES: Route[] = config.map(
  (route: Omit<Route, "id">, index: number) => ({ ...route, id: index + 1 }),
);
