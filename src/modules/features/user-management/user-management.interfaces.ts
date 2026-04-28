import type { ApiState } from "../../../interfaces/api.interface";

export interface UserManagementSlice {
  usersLists: Array<User>;
  params: any;
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
  countryCode?: string;
  contactPersonPhone?: string;
}

export interface CreateUser {
  branchId: string;
  countryCode: string;
  fullName: string;
  roleId: string;
  id?:string
}
