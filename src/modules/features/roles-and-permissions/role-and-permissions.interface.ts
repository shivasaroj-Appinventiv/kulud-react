import type { ApiState } from "@/interfaces/api.interface";

export type PermissionAction = "view" | "edit";

export interface Permission {
  id: string;
  module: string;
  action: PermissionAction;
}

export interface PermissionGroup {
  module: string;
  displayName: string;
  view?: PermissionWithCheck;
  edit?: PermissionWithCheck;
}

export interface PermissionWithCheck extends Permission {
  checked: boolean;
}

export interface Role {
  id: string;
  name: string;
  status: string;
  totalUsers?:number;
  createdAt?:string;
  permissions: Permission[];
}

export interface RoleListResponse {
  items: Role[];
  totalItems: number;
}

export interface RoleState {
  roles: Role[];
  total: number;
  permissions: PermissionGroup[];
  roleDetails: Role | null;
  loading: boolean;
  error: string | null;
  params:any;
  status:ApiState;
  totalDocs: number;
  details:any

}