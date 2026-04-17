export class UserProfileData {
  accessToken: string = "";
  userId?: string = "";
  email?: string = "";
  name?: string = "";
  firstName?: string = "";
  lastName?: string = "";
  profilePicture?: string = "";
  permission?: Permission[] = [];
  userType?: string = "";
  totalRatings?: number = 0;
  avgRating?: number = 0;
  countryCode?: string = "";
  mobileNo?: string = "";
  _id?: string = "";
}

export interface Permission {
  module: string;
  view: boolean;
  addAndEdit: boolean;
  blockAndUnblock: boolean;
  delete: boolean;
}
