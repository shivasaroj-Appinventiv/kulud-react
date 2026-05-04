import type { Permission } from "@/redux/global.interface";

export type PermissionAction = "view" | "edit";

const hasPermission = (
  allPermissions: Permission[],
  module: string,
  action: PermissionAction,
) => {
  return allPermissions.some(
    (perm) =>
      perm.module === module &&
      perm.action === action &&
      perm.status === "ACTIVE",
  );
};

export default hasPermission;
