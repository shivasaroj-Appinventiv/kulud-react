import { lazy } from "react";
import { ROUTES } from "./RouteConstant";
import type { AppRoute } from "@/types/routeTypes";
import AuthLayout from "@/layouts/auth/AuthLayout";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { Navigate } from "react-router-dom";

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
    element: <Dashboard />,
  },
  {
    path: ROUTES.PROFILE, // "/"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <Profile />,
  },
  {
    path: ROUTES.USER_MANAGEMENT, // "/users"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <UserList />,
  },
  {
    path: ROUTES.Add_USER, // "/users"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <AddUser />,
  },

  {
    path: ROUTES.EDIT_USER(":id"), // "/users/:id"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <AddUser />,
  },

    {
    path: ROUTES.USER_DETAILS,
    Layout: DashboardLayout,
    isPrivate: true,
    element: <UserDetails />,
  },
  {
    path: ROUTES.ROLES_AND_PERMISSIONS,
    Layout: DashboardLayout,
    isPrivate: true,
    element: <RolesAndPermission />,
  },
  {
    path: ROUTES.ROLES_DETAILS,
    Layout: DashboardLayout,
    isPrivate: true,
    element: <RoleDetails />,
  },
  {
    path: ROUTES.ADD_ROLES,
    Layout: DashboardLayout,
    isPrivate: true,
    element: <AddEditRole />,
  },

  {
    path: ROUTES.EDIT_ROLES,
    Layout: DashboardLayout,
    isPrivate: true,
    element: <AddEditRole />,
  },

  {
    path: ROUTES.CMS, // "/cms"
    Layout: DashboardLayout,
    isPrivate: true,
    element: <CMS />,
    children: [
      {
        path: "",
        element: <Navigate to="about-us" replace />, // ✅ default route
      },
      { path: "about-us", element: <About /> },
      { path: "privacy-policy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
];
