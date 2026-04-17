const adminService= "admin/api/v1";
const endPoints = {
  //Admin endPoints
  logInAdmin: "admin/api/v1/login",
  FORGOT_PASSWORD_API : `${adminService}/forgot-password`,
  VERIFY_OTP_FROM_PROFILE_API :`${adminService}/verify-otp`,
  RESET_PASSWORD_API :`${adminService}/reset-password`,

  //Parent endPoints
  logInParent: "parent/v1/login",
  signUpParent: "parent/v1/signup",
  logoutParent: "parent/v1/logout",
  addChildParent: "parent/v1/child",

  login: "admin/api/v1/login",
  logout: `${adminService}/logout`,
  getUserDetails: `${adminService}/profile`,
  eventList:'organizer/api/v1/organizer/panel-organizer-event-list',
  organizationList:'user/api/v1/organization/panel-organization-list',
  get_organization_details: 'user/api/v1/organization/get-organization-detail',
  update_organization_details: 'user/api/v1/organization/update-organization',


  userList:`${adminService}/sub-admins`,
  userDetails:(id:string)=> `${adminService}/sub-admins/${id}`,
  
};
export const EVENT_DETAIL_BY_ID = (eventId: string) => `organizer/api/v1/organizer/panel-organizer-event-detail/${eventId}`;

export default endPoints;
