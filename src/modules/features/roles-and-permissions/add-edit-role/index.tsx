import { Skeleton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddEditRoleHelper } from "./add-edit-role.helper";
import { addRole, updateRole } from "../roles-and-permissions.slice";
import { toastService } from "@/utils/toast.service";
import { ROUTES } from "@/routes/RouteConstant";
import Breadcrumb from "../../../../components/breadcrumb";
import { Shield, Eye, Pencil, CheckSquare } from "lucide-react";

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

  const selectedPermissionIds =
    roleDetails?.permissions?.map((p: any) => p.id) || [];

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

        const payload = { name: values.name, permissionIds };

        if (id) {
          await dispatch(updateRole({ id, ...payload })).unwrap();
        } else {
          await dispatch(addRole(payload)).unwrap();
        }
        navigate(ROUTES.ROLES_AND_PERMISSIONS);
      } catch {
      }
    },
  });

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
          edit: newVal ? p.edit : { ...p.edit, checked: false },
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

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (!permissionsList?.length || (id && !roleDetails)) {
    console.log(permissionsList,roleDetails);
    
    return (
      <div className="p-6 space-y-3">
        <Skeleton variant="rounded" height={44} />
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 bg-gray-50 px-5 py-3 border-b border-gray-100">
            {["", "", ""].map((_, i) => (
              <Skeleton key={i} height={20} width={80} />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-3 px-5 py-3 border-b border-gray-50">
              <Skeleton height={16} width={100} />
              <div className="flex justify-center"><Skeleton variant="circular" width={20} height={20} /></div>
              <div className="flex justify-center"><Skeleton variant="circular" width={20} height={20} /></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasPermissionSelected = formik.values.permissions.some(
    (p: any) => p.view?.checked || p.edit?.checked
  );

  const allViewSelected = formik.values.permissions.every((p: any) => p.view?.checked);
  const allEditSelected = formik.values.permissions.every((p: any) => p.edit?.checked);

  const selectedCount = formik.values.permissions.filter(
    (p: any) => p.view?.checked || p.edit?.checked
  ).length;

  return (
    <div className=" overflow-hidden">
      <Breadcrumb breadCrumbs={breadcrumbs} />

      <form onSubmit={formik.handleSubmit} className="p-6 space-y-5">

        {/* ── Role Name Input ─────────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Role Name
          </label>
          <input
            name="name"
            placeholder="e.g. Store Manager, Content Editor..."
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all outline-none
              ${formik.touched.name && formik.errors.name
                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-xs text-red-500 mt-1.5 ml-1">{formik.errors.name as string}</p>
          )}
        </div>

        {/* ── Permissions Table ───────────────────────────────────────────── */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* Table header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield size={15} className="text-gray-400" />
              <span className="text-sm font-semibold text-gray-800">Permissions</span>
              {selectedCount > 0 && (
                <span className="text-[11px] font-semibold bg-blue-500 text-white rounded-full px-2 py-0.5">
                  {selectedCount} selected
                </span>
              )}
            </div>
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100 px-5 py-2.5">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Module
            </div>

            {/* View All */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectAll("view")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  transition-all border
                  ${allViewSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                <Eye size={12} />
                View All
                {allViewSelected && <CheckSquare size={12} />}
              </button>
            </div>

            {/* Edit All */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSelectAll("edit")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  transition-all border
                  ${allEditSelected
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                <Pencil size={12} />
                Edit All
                {allEditSelected && <CheckSquare size={12} />}
              </button>
            </div>
          </div>

          {/* Permission rows */}
          <div className="divide-y divide-gray-50">
            {formik.values.permissions.map((perm: any, index: number) => {
              const rowActive = perm.view?.checked || perm.edit?.checked;

              return (
                <div
                  key={perm.module}
                  className={`grid grid-cols-3 items-center px-5 py-3 transition-colors
                    ${rowActive ? "bg-blue-50/40" : "hover:bg-gray-50/70"}`}
                >
                  {/* Module name */}
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0
                      ${rowActive ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                    <span className="text-sm text-gray-700 capitalize">
                      {perm.module.replace(/_/g, " ").toLowerCase()}
                    </span>
                  </div>

                  {/* View checkbox */}
                  <div className="flex justify-center">
                    <label className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                      transition-all border
                      ${perm.view?.checked
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={perm.view?.checked || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          formik.setFieldValue(`permissions[${index}].view.checked`, checked);
                          if (!checked && perm.edit?.checked) {
                            formik.setFieldValue(`permissions[${index}].edit.checked`, false);
                          }
                        }}
                      />
                      {perm.view?.checked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </label>
                  </div>

                  {/* Edit checkbox */}
                  <div className="flex justify-center">
                    <label className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
                      transition-all border
                      ${perm.edit?.checked
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={perm.edit?.checked || false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          formik.setFieldValue(`permissions[${index}].edit.checked`, checked);
                          if (checked && perm.view) {
                            formik.setFieldValue(`permissions[${index}].view.checked`, true);
                          }
                        }}
                      />
                      {perm.edit?.checked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ROLES_AND_PERMISSIONS)}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200
                       rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formik.isValid || !hasPermissionSelected || formik.isSubmitting}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-500 rounded-xl
                       hover:bg-blue-600 active:scale-95 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {formik.isSubmitting
              ? "Saving..."
              : id ? "Update Role" : "Add Role"
            }
          </button>
        </div>

      </form>
    </div>
  );
}