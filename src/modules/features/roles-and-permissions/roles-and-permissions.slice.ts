import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { http } from "@/api/http.service";
import type {
  RoleState,
  RoleListResponse,
  Role,
  Permission,
  PermissionGroup,
} from "./role-and-permissions.interface";
import endPoints from "@/api/endPoints";
import type { ApiResponse, PaginatedQuery } from "@/interfaces/api.interface";
import { DEFAULT_PAGE_OPTIONS } from "@/internal/api.constant";
import { setLoading } from "@/redux/slices/global.slice";
import { toastService } from "@/utils/toast.service";

const initialState: RoleState = {
  roles: [],
  total: 0,
  permissions: [],
  roleDetails: null,
  loading: false,
  params: DEFAULT_PAGE_OPTIONS,
  error: "",
  status: "idle",
  totalDocs: 0,
  details: null,
};

const formatPermissions = (list: Permission[]): PermissionGroup[] => {
  const map: Record<string, PermissionGroup> = {};

  list.forEach((item) => {
    if (!map[item.module]) {
      map[item.module] = {
        module: item.module,
        displayName: item.module.replace(/_/g, " "),
      };
    }

    if (item.action === "view") {
      map[item.module].view = { ...item, checked: false };
    }

    if (item.action === "edit") {
      map[item.module].edit = { ...item, checked: false };
    }
  });

  return Object.values(map);
};

// ==============================
// ✅ API CALLS
// ==============================

export const getRoles = createAsyncThunk(
  "roles/getRoles",
  async (query: PaginatedQuery, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await http.get<ApiResponse<any>>(
        endPoints.ROLE_LIST_NEW,
        query,
      );
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const getPermissions = createAsyncThunk<PermissionGroup[]>(
  "roles/getPermissions",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await http.get(endPoints.GET_ALL_PERMISSIONS);
      return formatPermissions(res.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const getRoleDetails = createAsyncThunk<Role, string>(
  "roles/getRoleDetails",
  async (roleId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await http.get(endPoints.GET_ROLE_BY_ID(roleId));
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const addRole = createAsyncThunk(
  "roles/addRole",
  async (payload: any, thunkAPI) => {
    try {
      const res = await http.post("/roles", payload);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ roleId, status }: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await http.put(endPoints.ROLE_UPDATE(roleId), { status });
      toastService.showToast(res.data.message, "success");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (roleId: string, thunkAPI) => {
    try {
      await http.delete(`/roles/${roleId}`);
      return roleId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

// ==============================
// ✅ SLICE
// ==============================

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    resetRoleDetails: (state) => {
      state.roleDetails = null;
    },

    setParams: (state, action) => {
      state.params = action.payload;
    },
    resetParams: (state, action) => {
      state.params = DEFAULT_PAGE_OPTIONS;
    },

    applyRolePermissions: (state, action) => {
      const rolePermissions = action.payload;

      state.permissions.forEach((perm) => {
        if (perm.view) {
          perm.view.checked = !!rolePermissions.find(
            (p: Permission) => p.id === perm.view?.id,
          );
        }

        if (perm.edit) {
          perm.edit.checked = !!rolePermissions.find(
            (p: Permission) => p.id === perm.edit?.id,
          );
        }
      });
    },

    // ✅ TOGGLE VIEW
    toggleView: (state, action) => {
      const perm = action.payload;

      if (!perm.view?.checked && perm.edit?.checked) {
        perm.edit.checked = false;
      }
    },

    // ✅ TOGGLE EDIT
    toggleEdit: (state, action) => {
      const perm = action.payload;

      if (perm.edit?.checked && perm.view) {
        perm.view.checked = true;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // LIST
      .addCase(getRoles.fulfilled, (state, action) => {
        state.roles = action.payload.items;
        state.totalDocs = action.payload.meta.totalItems;
        state.total = action.payload.totalItems;
      })

      // PERMISSIONS
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.permissions = action.payload;
      })

      // DETAILS
      .addCase(getRoleDetails.fulfilled, (state, action) => {
        state.roleDetails = action.payload;
      })

      // DELETE
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((r) => r.id !== action.payload);
      });
  },
});

export const {
  resetRoleDetails,
  applyRolePermissions,
  toggleView,
  toggleEdit,
  setParams,
  resetParams,
} = rolesSlice.actions;

export default rolesSlice.reducer;
