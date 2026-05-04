import { lazy } from "react";
import { ROUTES } from "./RouteConstant";
import type { AppRoute } from "@/types/routeTypes";
import AuthLayout from "@/layouts/auth/AuthLayout";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { Navigate } from "react-router-dom";
import { FEATURE_SLUGS } from "@/constants/feature-slugs.enum";

// Auth
const Login = lazy(() => import("@auth/login"));
const ForgotPassword = lazy(() => import("@auth/forgot-password"));
const VerifyOTP = lazy(() => import("@auth/verify-otp"));
const ResetPassword = lazy(() => import("@auth/reset-password"));
//Profile

const Profile = lazy(() => import("@features/my-profile"));
// Dashboard
const Dashboard = lazy(() => import("@features/Dashboard"));

// User
const UserList = lazy(() => import("@features/user-management/user-list"));
const UserDetails = lazy(
  () => import("@features/user-management/user-details"),
);
const AddUser = lazy(() => import("@features/user-management/add-edit-user"));
//Permissions
const RolesAndPermission = lazy(
  () => import("@/modules/features/roles-and-permissions/list"),
);
const RoleDetails = lazy(
  () => import("@features/roles-and-permissions/role-details"),
);
const AddEditRole = lazy(
  () => import("@features/roles-and-permissions/add-edit-role"),
);
// CMS
const CMS = lazy(() => import("@features/cms"));
const About = lazy(() => import("@features/cms/components/about-us"));
const Privacy = lazy(() => import("@features/cms/components/privacy-policy"));
const Terms = lazy(
  () => import("@features/cms/components/terms-and-conditions"),
);

export const APP_ROUTES: AppRoute[] = [
  // ── Auth routes — each is a top-level route, no nesting ──
  {
    path: ROUTES.LOGIN,
    Layout: AuthLayout,
    hideAfterLogin: true,
    element: <Login />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    Layout: AuthLayout,
    hideAfterLogin: true,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.VERIFY_OTP,
    Layout: AuthLayout,
    hideAfterLogin: true,
    element: <VerifyOTP />,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    Layout: AuthLayout,
    hideAfterLogin: true,
    element: <ResetPassword />,
  },

  // ── Dashboard routes — nested under "/" ──
  {
    path: ROUTES.DASHBOARD, // "/"
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    name: FEATURE_SLUGS.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ROUTES.PROFILE, // "/"
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    element: <Profile />,
  },
  {
    path: ROUTES.USER_MANAGEMENT, // "/users"
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    name: FEATURE_SLUGS.USER,
    element: <UserList />,
  },
  {
    path: ROUTES.Add_USER, // "/users"
    Layout: DashboardLayout,
    isPrivate: true,
    action:"edit",
    name: FEATURE_SLUGS.USER,
    element: <AddUser />,
  },

  {
    path: ROUTES.EDIT_USER(":id"), // "/users/:id"
    Layout: DashboardLayout,
    isPrivate: true,
    name: FEATURE_SLUGS.USER,
    action:"edit",
    element: <AddUser />,
  },

    {
    path: ROUTES.USER_DETAILS,
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    name: FEATURE_SLUGS.USER,
    element: <UserDetails />,
  },
  {
    path: ROUTES.ROLES_AND_PERMISSIONS,
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    name: FEATURE_SLUGS.ROLES,
    element: <RolesAndPermission />,
  },
  {
    path: ROUTES.ROLES_DETAILS,
    Layout: DashboardLayout,
    isPrivate: true,
    action:"view",
    name: FEATURE_SLUGS.ROLES,
    element: <RoleDetails />,
  },
  {
    path: ROUTES.ADD_ROLES,
    Layout: DashboardLayout,
    isPrivate: true,
    action:"edit",
    name: FEATURE_SLUGS.ROLES,
    element: <AddEditRole />,
  },

  {
    path: ROUTES.EDIT_ROLES,
    Layout: DashboardLayout,
    isPrivate: true,
    action: "edit",
    name: FEATURE_SLUGS.ROLES,
    element: <AddEditRole />,
  },

  {
    path: ROUTES.CMS, // "/cms"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <CMS />,
    action:"view",
    children: [
      {
        path: "",
        element: <Navigate to="about-us" replace />, // ✅ default route
      },
      { path: "about-us", action:"edit",  name:FEATURE_SLUGS.CMS,  element: <About /> },
      { path: "privacy-policy", action:"edit", name:FEATURE_SLUGS.CMS, element: <Privacy /> },
      { path: "terms", action:"edit",  name:FEATURE_SLUGS.CMS,element: <Terms /> },
    ],
  },
];
