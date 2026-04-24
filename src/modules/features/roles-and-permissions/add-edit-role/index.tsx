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
import { useEffect } from "react";

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

  // ✅ Selected permissions for edit mode
  const selectedPermissionIds =
    roleDetails?.permissions?.map((p: any) => p.id) || [];
  const roleSchema = Yup.object({
    name: Yup.string().trim().required("Role name is required"),
  });

  const addEditHandler = async (values: any) => {
    const permissionIds: string[] = [];
    console.log(values.permissions);
    
    values.permissions.forEach((p: any) => {
      if (p.view?.checked) permissionIds.push(p.view.id);
    debugger;

      if (p.edit?.checked) permissionIds.push(p.edit.id);
    });

    const payload = {
      name: values.name,
      permissionIds,
    };

    if (id) {
      await dispatch(updateRole({ id: id, ...payload }));
    } else {
      await dispatch(addRole(payload));
    }
    toastService.showToast(
      `Role has been ${id ? "added" : "updated"} successfully`,
      "success",
    );
    navigate(ROUTES.ROLES_AND_PERMISSIONS);
  };
  useEffect(() => {
    console.log(permissionsList, "permissionsList");
  }, [permissionsList]);

  const formik = useFormik({
    enableReinitialize: true,
    validateOnMount: true,
    initialValues: {
      name: roleDetails?.name || "",
      permissions: transformPermissions(permissionsList, selectedPermissionIds),
    },
    validationSchema: roleSchema,
    onSubmit: (values) => {
      addEditHandler(values);
    },
  });

  // Select All Method
  const handleSelectAll = (type: "view" | "edit") => {
    const allSelected = formik.values.permissions.every(
      (p: any) => p[type]?.checked,
    );

    const newVal = !allSelected;

    const updated = formik.values.permissions.map((p: any) => {
      //  VIEW ALL
      if (type === "view") {
        return {
          ...p,
          view: p.view ? { ...p.view, checked: newVal } : null,
          //  remain edit as it is
          edit: p.edit,
        };
      }

      //  EDIT ALL
      if (type === "edit") {
        return {
          ...p,
          edit: p.edit ? { ...p.edit, checked: newVal } : null,
          // if edit ON → force view ON
          view: p.view
            ? {
                ...p.view,
                checked: newVal ? true : p.view.checked,
              }
            : null,
        };
      }

      return p;
    });

    formik.setFieldValue("permissions", updated);
  };

  if (!permissionsList?.length || (id && !roleDetails)) {
    return (
      <div className="p-6">
        <div className="shadow-md rounded-xl p-6 space-y-6 bg-white">
          <Skeleton height={40} />
          <Skeleton height={1} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 items-center gap-4 mt-3">
              <Skeleton height={15} width={120} />

              <div className="flex justify-center">
                {/* <Skeleton circle width={18} height={18} /> */}
              </div>

              <div className="flex justify-center">
                {/* <Skeleton circle width={18} height={18} /> */}
              </div>
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

  return (
    <>
      <Breadcrumb breadCrumbs={breadcrumbs} />
      <form onSubmit={formik.handleSubmit} className="p-6">
        <Card className="shadow-md rounded-xl">
          <CardContent className="space-y-6">
            <div>
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
                autoComplete="off"
              />
            </div>

            <Divider />

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-100 p-3 text-sm font-semibold items-center">
                <div className="pl-2">Permissions</div>

                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      size="small"
                      onChange={() => handleSelectAll("view")}
                      checked={formik.values.permissions.every(
                        (p: any) => p.view?.checked,
                      )}
                    />
                    <span>View All</span>
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      size="small"
                      onChange={() => handleSelectAll("edit")}
                      checked={formik.values.permissions.every(
                        (p: any) => p.edit?.checked,
                      )}
                    />
                    <span>Edit All</span>
                  </div>
                </div>
              </div>

              {formik.values.permissions.map((perm: any, index: number) => (
                <div
                  key={perm.module}
                  className="grid grid-cols-3 items-center p-3 border-t text-sm"
                >
                  <div className="pl-2 capitalize">
                    {perm.module.replace(/_/g, " ")}
                  </div>

                  <div className="flex justify-center items-center">
                    <Checkbox
                      size="small"
                      checked={perm.view?.checked || false}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        formik.setFieldValue(
                          `permissions[${index}].view.checked`,
                          checked,
                        );
                      }}
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <Checkbox
                      size="small"
                      checked={perm.edit?.checked || false}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        formik.setFieldValue(
                          `permissions[${index}].edit.checked`,
                          checked,
                        );

                        if (checked && perm.view) {
                          formik.setFieldValue(
                            `permissions[${index}].view.checked`,
                            true,
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.ROLES_AND_PERMISSIONS)}
                className="normal-case!"
                sx={{ width: "200px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => formik.handleSubmit()}
                disabled={!formik.isValid || formik.isSubmitting}
                sx={{
                  width: "200px",
                  textTransform: "none",
                }}
              >
                Save Role
              </Button>
            </div>
          </CardContent>
          {/* <CommonDialog
                        open={openCancelDialog}
                        title="Cancel"
                        description={`Are you sure you want to Cancel ?`}
                        onClose={toggleCancelDialog}
                        onConfirm={() => {
                            toggleCancelDialog();
                            navigate(Paths.ROLES)
                        }}
                        cancelText='Cancel'
                    />
                    <CommonDialog
                        open={openSaveDialog}
                        title={`${id ? 'Update Role' : 'Add Role'}`}
                        description={`Are you sure you want to ${id ? 'Update' : 'Add'} Role?`}
                        onClose={toggleSaveDialog}
                        onConfirm={() => {
                            formik.handleSubmit();
                        }}
                        cancelText='Cancel'
                    /> */}
        </Card>
      </form>
    </>
  );
}
