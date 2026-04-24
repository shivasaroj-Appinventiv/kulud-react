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
  GET_ROLES_DETAILS:(id:string)=> `/roles-and-permissions/${id}`,
  ROLES_DETAILS: `/roles-and-permissions/:id`,
  EDIT_ROLES: `/roles-and-permissions/edit/:id`,
  GET_EDIT_ROLES: (id:string)=> `/roles-and-permissions/edit/${id}`,
  ADD_ROLES: `/roles-and-permissions/add`,
  GET_USER_DETAILS: (id: string) => `/users/${id}`,
  ORGANIZATIONS: "/organizations",
  GET_ORGANIZATION_DETAILS: (id: string) => `/organizations/${id}`,
  EDIT_ORGANIZATION_DETAILS: (id: string) => `/organizations/edit/${id}`,
  CMS: "/cms",
};

export const PAGE_HEADINGS = {
  MANAGEMENT: "Management",
  DASHBOARD: "Dashboard",
  ROLES_AND_PERMISSIONS:"Roles & Permissions",
  ROLES_DETAILS:"Roles Details",
  ADD_ROLE:"Add Role",
  EDIT_ROLE:"Edit Role",
  LOGIN: "Login",
  PROFILE: "Profile",
  FORGOT_PASSWORD: "Forgot Password",
  RESET_PASSWORD: "Reset Password",
  EDIT_FAQ: "Edit Faq",
  SIGNUP: "Sign up",
  CONTENT: "Content",
  VERIFY_OTP: "verify-otp",
  USER_MANAGEMENT: "User Management",
  CMS_MANAGEMENT: "CMS Management",
  USER_DETAILS: "User Details",
};