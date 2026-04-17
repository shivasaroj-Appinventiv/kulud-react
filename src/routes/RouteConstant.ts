export const ROUTES = {
  LOGIN: "/login",
  PROFILE:"/profile",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_OTP: "/verify-otp",
  SIGNUP: "/signup",
  DASHBOARD: "/",
  USER_MANAGEMENT:"/users",
  ORGANIZATIONS: "/organizations",
  EDIT_ORGANIZATIONS_DETAILS: "/organizations/edit/:id",
  EDIT_ORGANIZATION_DETAILS: (id: string) => `/organizations/edit/${id}`,
  ORGANIZATIONS_DETAILS: '/organizations/:id',

  GET_ORGANIZATION_DETAILS: (id: string) => `/organizations/${id}`,
};

export const PAGE_HEADINGS = {
  MANAGEMENT: 'Management',
  DASHBOARD: 'Dashboard',
  EVENTS:'EVENTS',
  ORGANIZATION:'ORGANIZATION',
  ORGANIZATION_DETAILS:'ORGANIZATION DETAILS',
  EDIT_ORGANIZATION_DETAILS:'Edit Organization Details',
  LOGIN: 'Login',
  PROFILE: 'Profile',
  FORGOT_PASSWORD: 'Forgot Password',
  RESET_PASSWORD: 'Reset Password',
  EDIT_FAQ: 'Edit Faq',
  SIGNUP: 'Sign up',
  CONTENT: 'Content',
  VERIFY_OTP:'verify-otp',

 USER_MANAGEMENT:'USER MANAGEMENT',


};
