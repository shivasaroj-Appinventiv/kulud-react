import type { ApiState } from "../../../interfaces/api.interface";

export interface UserManagementSlice {
  usersList: Array<User>;
  status: ApiState;
  error: string | null;
  totalDocs: number;
  details: User | null;
}

export interface User {
  _id: string;
  organizationId?:string;
  name: string;
  order: number;
  description: string;
  descriptionAr: string;
  redirection: string;
  redirectionType: string;
  page: string[];
  image: string;
  imageAr: string;
  brand: string;
  variant: string;
  modelType: string;
  status: number;
  externalUrl: string;
  createdAt: string;
  color: string;
  address: string;
  profilePicture: string;
  email: string;
  bio: string;
  apt: string;
  city: string;
  state: string;
  zipcode: string;
  website: {
    name: string;
    link: string;
  };
  socialLink: Array<{
    name: string;
    link: string;
  }>;
}