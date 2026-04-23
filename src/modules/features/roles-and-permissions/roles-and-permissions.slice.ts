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

const initialState: RoleState = {
  roles: [],
  total: 0,
  permissions: [],
  roleDetails: null,
  loading: false,
      params:DEFAULT_PAGE_OPTIONS,
    error: "",
    status: "idle",
    totalDocs: 0,
    details: null
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
      const res = await http.get<ApiResponse<any>>(endPoints.ROLE_LIST_NEW, query);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getPermissions = createAsyncThunk<PermissionGroup[]>(
  "roles/getPermissions",
  async (_, thunkAPI) => {
    try {
      const res = await http.get(endPoints.GET_ALL_PERMISSIONS);
      return formatPermissions(res.data.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getRoleDetails = createAsyncThunk<Role, string>(
  "roles/getRoleDetails",
  async (roleId, thunkAPI) => {
    try {
      const res = await http.get(`/roles/${roleId}`);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
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
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ roleId, payload }: any, thunkAPI) => {
    try {
      const res = await http.put(`/roles/${roleId}`, payload);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
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
  }
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

    applyRolePermissions: (state, action) => {
      const rolePermissions = action.payload;

      state.permissions.forEach((perm) => {
        if (perm.view) {
          perm.view.checked = !!rolePermissions.find(
            (p: Permission) => p.id === perm.view?.id
          );
        }

        if (perm.edit) {
          perm.edit.checked = !!rolePermissions.find(
            (p: Permission) => p.id === perm.edit?.id
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
        state.roles = state.roles.filter(r => r.id !== action.payload);
      });
  },
});

export const {
  resetRoleDetails,
  applyRolePermissions,
  toggleView,
  toggleEdit,
} = rolesSlice.actions;

export default rolesSlice.reducer;