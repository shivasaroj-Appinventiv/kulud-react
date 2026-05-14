import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CreateUser, User, UserManagementSlice } from "./user-management.interfaces";
import { setLoading } from "../../../redux/slices/global.slice";
import { http } from "../../../api/http.service";
import endPoints from "../../../api/endPoints";
import type {
  ApiResponse,
  PaginatedQuery,
} from "../../../interfaces/api.interface";
import { toastService } from "../../../utils/toast.service";
import { DEFAULT_PAGE_OPTIONS } from "../../../internal/api.constant";
const defaultPageOptions: PaginatedQuery = DEFAULT_PAGE_OPTIONS;
const userManagementSlice = createSlice({
  name: "UserManagement",
  initialState: {
    usersLists: [],
    params: defaultPageOptions,
    error: "",
    status: "idle",
    totalDocs: 0,
    details: null,
  } as unknown as UserManagementSlice,

  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
    setParams: (state, action) => {
      state.params = action.payload;
    },
    resetParams: (state, action) => {
      state.params = DEFAULT_PAGE_OPTIONS;
    },
  },

  extraReducers(builder) {
    // ─── getUsersList ───────────────────────────────
    builder.addCase(getUsersList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log(action.payload.items);

      state.usersLists = action.payload.items;
      console.log(state.usersLists);

      state.totalDocs = action.payload.meta.totalItems;
    });
    builder.addCase(getUsersList.rejected, (state) => {
      state.status = "failed";
      state.usersLists = [];
      state.totalDocs = 0;
    });

    // ─── getUserDetails ─────────────────────────────
    builder.addCase(getUserDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.details = action.payload;
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      state.status = "failed";
      state.details = null;
    });

    // ─── updateUserStatus ───────────────────────────
    builder.addCase(updateUserStatus.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.status = "succeeded";

      // // ✅ Update the user's status in the list directly — no refetch needed
      // const { userId, type } = action.meta.arg;
      // const user:User|undefined = state.usersLists.find((u: User) => u.id === userId);
      // if (user) {
      //   user.status = type as "ACTIVE" | "INACTIVE"; // optimistic update in the list
      // }

      // // ✅ Update details if the same user is currently open
      // if (state.details && (state.details as any).id === userId) {
      //   (state.details as any).status = type as "ACTIVE" | "INACTIVE";
      // }
    });
    builder.addCase(updateUserStatus.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(createUser.fulfilled,(state,action)=>{
      state.status="succeeded";
    })
  },

});

export const getUsersList = createAsyncThunk(
  "userManagement/list",
  async (query: PaginatedQuery, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.get<ApiResponse<any>>(
        endPoints.userList,
        query,
      );
      return response.data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const getUserDetails = createAsyncThunk(
  "userManagement/details",
  async (userId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.get<ApiResponse<any>>(
        endPoints.userDetails(userId),
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const updateUserStatus = createAsyncThunk(
  "userManagement/updateUserStatus",
  async (payload: { type: string; userId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.put<ApiResponse<any>>(
        endPoints.USER_ACTIVATE_DEACTIVATE(payload.userId, payload.type),
        {},
      );
      const { message } = response.data;
      toastService.showToast(message, "success"); // ✅ success toast
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // ✅ properly reject
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const createUser = createAsyncThunk("userManagement/create",async(payload:CreateUser,thunkAPI)=>{
   try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.post<ApiResponse<any>>(
        endPoints.USER_CREATE,
        payload
      );
      console.log(response.data,'*******');
      toastService.showToast(response.data.message,"success");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
});

export const updateUser = createAsyncThunk("userManagement/create",async(payload:CreateUser,thunkAPI)=>{
   try {
      thunkAPI.dispatch(setLoading(true));
      const id = payload.id||'';
      delete payload.id;
      const response = await http.put<ApiResponse<any>>(
        endPoints.USER_UPDATE(id),
        payload
      );
      console.log(response.data,'*******');
      toastService.showToast(response.data.message,"success");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
});

export const { setUserDetails, setParams, resetParams } =
  userManagementSlice.actions;
export default userManagementSlice.reducer;
