import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserManagementSlice } from "./user-management.interfaces";
import { setLoading } from "../../../redux/slices/global.slice";
import { http } from "../../../api/http.service";
import endPoints from "../../../api/endPoints";
import type {
  ApiResponse,
  PaginatedQuery,
} from "../../../interfaces/api.interface";

const userManagementSlice = createSlice({
  name: "UserManagement",
  initialState: {
    usersList: [],
    error: "",
    status: "idle",
    totalDocs: 0,
    details: null,
  } as unknown as UserManagementSlice,

  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.usersList = action.payload.items;
      state.totalDocs = action.payload.meta.totalItems;
    });
    builder.addCase(getUsersList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersList.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.details = action.payload;
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateUserStatus.rejected, (state, action) => {
      state.status = "failed";
    });
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
      const { data } = response.data;
      return data;
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
      console.log(response);

      const { data } = response.data;

      return data;
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
      console.log(response);
    } catch (error) {
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export default userManagementSlice.reducer;
