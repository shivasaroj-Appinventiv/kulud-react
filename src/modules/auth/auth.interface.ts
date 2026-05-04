import type { Permission } from "@/redux/global.interface";

export interface Admin {
  id: string;
  adminId: string;
  fullName: string;
  email: string;
  phone: string;
  fullPhoneNo: string;
  countryCode: string;
  profilePicture: string | null;
  role: {
    permissions: Permission[];
  };
  status: "ACTIVE" | "INACTIVE";
  userType: "SUB_ADMIN" | "ADMIN" | string;
}

export interface Auth {
  admin: Admin;
}

export interface UpdateProfile {
  name: string | null;
  profilePicture: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export interface ForgotPassword {
  email: string;
}

export interface VerifyOTP {
  otp: string;
  email: string | null;
}
export interface ResetPassword {
  password: string;
  confirmPassword: string;
  sessionToken: string | null;
}
