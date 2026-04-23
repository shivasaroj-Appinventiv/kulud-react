export const ROUTES = {
  // Auth — absolute
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_OTP: "/verify-otp",
  SIGNUP: "/signup",

  // Dashboard
  DASHBOARD: "/",
  PROFILE: "/profile",

  // Absolute — for navigate() and <Link to>
  USER_MANAGEMENT: "/users",
  ROLES_AND_PERMISSIONS: "/roles-and-permissions",
  GET_USER_DETAILS: (id: string) => `/users/${id}`,
  ORGANIZATIONS: "/organizations",
  GET_ORGANIZATION_DETAILS: (id: string) => `/organizations/${id}`,
  EDIT_ORGANIZATION_DETAILS: (id: string) => `/organizations/edit/${id}`,
  CMS: "/cms",
};

export const PAGE_HEADINGS = {
  MANAGEMENT: "Management",
  DASHBOARD: "Dashboard",
  EVENTS: "EVENTS",
  ORGANIZATION: "ORGANIZATION",
  ORGANIZATION_DETAILS: "ORGANIZATION DETAILS",
  EDIT_ORGANIZATION_DETAILS: "Edit Organization Details",
  ROLES_AND_PERMISSIONS:"Roles & Permissions",
  LOGIN: "Login",
  PROFILE: "Profile",
  FORGOT_PASSWORD: "Forgot Password",
  RESET_PASSWORD: "Reset Password",
  EDIT_FAQ: "Edit Faq",
  SIGNUP: "Sign up",
  CONTENT: "Content",
  VERIFY_OTP: "verify-otp",
  USER_MANAGEMENT: "USER MANAGEMENT",
  CMS_MANAGEMENT: "CMS MANAGEMENT",
  USER_DETAILS: "USER DETAILS",
};