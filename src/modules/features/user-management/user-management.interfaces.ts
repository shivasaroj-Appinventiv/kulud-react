import type { ApiState } from "../../../interfaces/api.interface";

export interface UserManagementSlice {
  usersList: Array<User>;
  status: ApiState;
  error: string | null;
  totalDocs: number;
  details: User | null;
}

export interface Role {
  id: string;
  name: string;
  isPharmacist: boolean;
  isSuperAdmin: boolean;
  permissions?: any[]; // keep flexible
}

export interface Branch {
  id: string;
  branchId: string;

  nameEn: string;
  nameAr: string;

  image: string | null;

  isHub: boolean;
  status: "ACTIVE" | "INACTIVE";

  phone: string | null;
  countryCode: string | null;
  countryFlag: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  adminId: string;

  fullName: string;
  email: string;
  phone: string;
  fullPhoneNo: string;

  profilePicture: string | null;

  status: "ACTIVE" | "INACTIVE";
  userType: "SUB_ADMIN" | "ADMIN" | string;

  isInventoryControlEnabled: boolean;
  forcePasswordChange: boolean;

  deliveryBaseFee: number;

  createdAt: string;
  updatedAt: string;

  branchId: string;
  roleId: string;

  branch: Branch;
  role: Role;

  CDN: string;
}

// export interface User {
//   _id: string;
//   organizationId?:string;
//   name: string;
//   order: number;
//   description: string;
//   descriptionAr: string;
//   redirection: string;
//   redirectionType: string;
//   page: string[];
//   image: string;
//   imageAr: string;
//   brand: string;
//   variant: string;
//   modelType: string;
//   status: number;
//   externalUrl: string;
//   createdAt: string;
//   color: string;
//   address: string;
//   profilePicture: string;
//   email: string;
//   bio: string;
//   apt: string;
//   city: string;
//   state: string;
//   zipcode: string;
//   website: {
//     name: string;
//     link: string;
//   };
//   socialLink: Array<{
//     name: string;
//     link: string;
//   }>;
// }