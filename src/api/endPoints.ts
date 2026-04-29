const adminService = "admin/api/v1";
const SUB_ADMINS = "sub-admins";
const VERSION = "v1";
const API = "api";
const CMS = "cms";
const ADMIN = "admin";
const ROLE = "roles";

const endPoints = {
  //Admin endPoints
  logInAdmin: "admin/api/v1/login",
  FORGOT_PASSWORD_API: `${adminService}/forgot-password`,
  VERIFY_OTP_FROM_PROFILE_API: `${adminService}/verify-otp`,
  RESET_PASSWORD_API: `${adminService}/reset-password`,

  //Parent endPoints
  logInParent: "parent/v1/login",
  signUpParent: "parent/v1/signup",
  logoutParent: "parent/v1/logout",
  addChildParent: "parent/v1/child",

  login: "admin/api/v1/login",
  logout: `${adminService}/logout`,
  getUserDetails: `${adminService}/profile`,
  eventList: "organizer/api/v1/organizer/panel-organizer-event-list",
  organizationList: "user/api/v1/organization/panel-organization-list",
  get_organization_details: "user/api/v1/organization/get-organization-detail",
  update_organization_details: "user/api/v1/organization/update-organization",

  //CMS
  APPLICATION_CMS: `${CMS}/${API}/${VERSION}/application-terms`,

  ROLE_LIST_NEW: `${ADMIN}/${API}/${VERSION}/${ROLE}`,
  ROLE_LIST_FOR_DROPDOWN: `${ADMIN}/${API}/${VERSION}/${ROLE}/for-dropdown`,
  BRANCH_LIST_FOR_DROPDOWN: `${ADMIN}/${API}/${VERSION}/branch/for-dropdown`,
  CREATE_ROLE: `${ADMIN}/${API}/${VERSION}/${ROLE}`,
  GET_ALL_PERMISSIONS: `${ADMIN}/${API}/${VERSION}/${ROLE}/permissions`,
  DELETE_ROLE: (id: string) => `${ADMIN}/${API}/${VERSION}/${ROLE}/${id}`,
  GET_ROLE_BY_ID: (id: string) => `${ADMIN}/${API}/${VERSION}/${ROLE}/${id}`,
  ROLE_UPDATE: (id: string) => `${ADMIN}/${API}/${VERSION}/${ROLE}/${id}`,
  ROLE_DETAILS: `${ADMIN}/${API}/${VERSION}/${ROLE}/details`,

  userList: `${adminService}/sub-admins`,
  userDetails: (id: string) => `${adminService}/sub-admins/${id}`,
  USER_CREATE : `${ADMIN}/${API}/${VERSION}/${SUB_ADMINS}`,
  USER_UPDATE :(id:string)=> `${ADMIN}/${API}/${VERSION}/${SUB_ADMINS}/${id}`,
  USER_ACTIVATE_DEACTIVATE: (id: string | number, type: string) =>
    `${adminService}/${SUB_ADMINS}/${id}/${type}`,

//Images

 FILE_UPLOAD : `${ADMIN}/${API}/${VERSION}/fetch-presigned-url`,


};
export const EVENT_DETAIL_BY_ID = (eventId: string) =>
  `organizer/api/v1/organizer/panel-organizer-event-detail/${eventId}`;

export default endPoints;
