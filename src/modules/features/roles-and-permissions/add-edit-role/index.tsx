import {
  Checkbox,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Skeleton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddEditRoleHelper } from "./add-edit-role.helper";
import { addRole, updateRole } from "../roles-and-permissions.slice";
import { toastService } from "@/utils/toast.service";
import { ROUTES } from "@/routes/RouteConstant";
import Breadcrumb from "../../../../components/breadcrumb";

export default function AddEditRole() {
  const {
    transformPermissions,
    permissionsList,
    id,
    dispatch,
    roleDetails,
    navigate,
    breadcrumbs,
  } = useAddEditRoleHelper();

  // ✅ selected permissions (edit mode)
  const selectedPermissionIds =
    roleDetails?.permissions?.map((p: any) => p.id) || [];

  // ✅ transform permissions safely
  const transformedPermissions = transformPermissions(
    permissionsList,
    selectedPermissionIds
  );

  const roleSchema = Yup.object({
    name: Yup.string().trim().required("Role name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      name: roleDetails?.name || "",
      permissions: transformedPermissions,
    },
    validationSchema: roleSchema,
    onSubmit: async (values) => {
      try {
        const permissionIds: string[] = [];

        (values.permissions || []).forEach((p: any) => {
          if (p.view?.checked) permissionIds.push(p.view.id);
          if (p.edit?.checked) permissionIds.push(p.edit.id);
        });

        const payload = {
          name: values.name,
          permissionIds,
        };

        if (id) {
          await dispatch(updateRole({ id, ...payload })).unwrap();
        } else {
          await dispatch(addRole(payload)).unwrap();
        }

        toastService.showToast(
          `Role has been ${id ? "updated" : "added"} successfully`,
          "success"
        );

        navigate(ROUTES.ROLES_AND_PERMISSIONS);
      } catch (error) {
        toastService.showToast("Something went wrong", "error");
      }
    },
  });

  // ✅ Select All logic
  const handleSelectAll = (type: "view" | "edit") => {
    const allSelected = formik.values.permissions.every(
      (p: any) => p[type]?.checked
    );

    const newVal = !allSelected;

    const updated = formik.values.permissions.map((p: any) => {
      if (type === "view") {
        return {
          ...p,
          view: p.view ? { ...p.view, checked: newVal } : null,
          edit: newVal ? p.edit : { ...p.edit, checked: false }, // uncheck edit if view off
        };
      }

      if (type === "edit") {
        return {
          ...p,
          edit: p.edit ? { ...p.edit, checked: newVal } : null,
          view: p.view
            ? { ...p.view, checked: newVal ? true : p.view.checked }
            : null,
        };
      }

      return p;
    });

    formik.setFieldValue("permissions", updated);
  };

  // ✅ Loading state
  if (!permissionsList?.length || (id && !roleDetails)) {
    return (
      <div className="p-6">
        <div className="shadow-md rounded-xl p-6 space-y-6 bg-white">
          <Skeleton height={40} />
          <Skeleton height={1} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 mt-3">
              <Skeleton height={15} width={120} />
            </div>
          ))}
          <div className="flex justify-center gap-4 mt-6">
            <Skeleton height={40} width={200} />
            <Skeleton height={40} width={200} />
          </div>
        </div>
      </div>
    );
  }

  // ✅ Check at least one permission selected
  const hasPermissionSelected = formik.values.permissions.some(
    (p: any) => p.view?.checked || p.edit?.checked
  );

  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs} />

      <form onSubmit={formik.handleSubmit} className="p-6">
        <Card className="shadow-md rounded-xl">
          <CardContent className="space-y-6">
            {/* Role Name */}
            <TextField
              fullWidth
              name="name"
              placeholder="Enter Role Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              }
              size="small"
            />

            <Divider />

            {/* Permissions Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-sm">
                <div>Permissions</div>

                <div className="flex justify-center gap-2">
                  <Checkbox
                    size="small"
                    onChange={() => handleSelectAll("view")}
                    checked={formik.values.permissions.every(
                      (p: any) => p.view?.checked
                    )}
                  />
                  <span>View All</span>
                </div>

                <div className="flex justify-center gap-2">
                  <Checkbox
                    size="small"
                    onChange={() => handleSelectAll("edit")}
                    checked={formik.values.permissions.every(
                      (p: any) => p.edit?.checked
                    )}
                  />
                  <span>Edit All</span>
                </div>
              </div>

              {formik.values.permissions.map((perm: any, index: number) => (
                <div
                  key={perm.module}
                  className="grid grid-cols-3 items-center p-3 border-t text-sm"
                >
                  <div className="capitalize">
                    {perm.module.replace(/_/g, " ")}
                  </div>

                  {/* VIEW */}
                  <div className="flex justify-center">
                    <Checkbox
                      size="small"
                      checked={perm.view?.checked || false}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        formik.setFieldValue(
                          `permissions[${index}].view.checked`,
                          checked
                        );

                        // 🚨 important fix
                        if (!checked && perm.edit?.checked) {
                          formik.setFieldValue(
                            `permissions[${index}].edit.checked`,
                            false
                          );
                        }
                      }}
                    />
                  </div>

                  {/* EDIT */}
                  <div className="flex justify-center">
                    <Checkbox
                      size="small"
                      checked={perm.edit?.checked || false}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        formik.setFieldValue(
                          `permissions[${index}].edit.checked`,
                          checked
                        );

                        // 🚨 if edit → force view
                        if (checked && perm.view) {
                          formik.setFieldValue(
                            `permissions[${index}].view.checked`,
                            true
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.ROLES_AND_PERMISSIONS)}
                sx={{ width: "200px" }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={
                  !formik.isValid ||
                  !hasPermissionSelected ||
                  formik.isSubmitting
                }
                sx={{ width: "200px" }}
              >
                {id ? "Update Role" : "Add Role"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}