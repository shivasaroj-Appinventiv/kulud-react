import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Admin,
  Auth,
  ForgotPassword,
  LoginPayload,
  ResetPassword,
  VerifyOTP,
} from "./auth.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../../redux/slices/global.slice";
import { http } from "../../api/http.service";
import endPoints from "../../api/endPoints";
import type { ApiResponse } from "../../interfaces/api.interface";
import { toastService } from "../../utils/toast.service";
const AUTH_SLICE_INITIAL_STATE: Auth = {
  admin: {
    id: "",
    adminId: "",
    fullName: "",
    email: "",
    phone: "",
    fullPhoneNo: "",
    countryCode: "",
    profilePicture: null,
    status: "ACTIVE",
    userType: ""
  },
  isPermissionsLoaded: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_SLICE_INITIAL_STATE,
  reducers: {
    setLoginDetails: (state, action: PayloadAction<Admin>) => {
      state.admin = { ...state.admin, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      
      // state.admin = { ...state.admin, ...action.payload };
    });
    builder.addCase(login.rejected, (state, action) => {
    });
    builder.addCase(getProfileDetails.fulfilled, (state, action) => {

      state.admin = { ...action.payload };
      state.isPermissionsLoaded = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {});
    builder.addCase(forgotPassword.rejected, (state, action) => {});
    builder.addCase(verifyOTP.fulfilled, (state, action) => {});
    builder.addCase(logout.fulfilled,(state,action)=>{
      state.isPermissionsLoaded = false;
    })
  },
});

export const login = createAsyncThunk(
  "login",
  async (payload: LoginPayload, thunkAPI) => {
    const payloadToSend = {
      email: payload.email,
      password: payload.password,
    };

    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.post<any>(
        endPoints.login,
        payloadToSend,
      );

      toastService.showToast("You logged in successfully", "success");
      return response;
    } catch (error) {
      
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (payload: ForgotPassword, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.post<ApiResponse<any>>(
        endPoints.FORGOT_PASSWORD_API,
        payload,
      );
      const { message, result } = response.data;
      toastService.showToast(message, "success");
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const verifyOTP = createAsyncThunk(
  "verifyOTP",
  async (payload:VerifyOTP, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.post(
        endPoints.VERIFY_OTP_FROM_PROFILE_API,
        payload,
      );
      
      const { message, data } = response.data;
      toastService.showToast(message, "success");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload:ResetPassword, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await http.post(
        endPoints.RESET_PASSWORD_API,
        payload,
      );
      const { message, result } = response.data;
      toastService.showToast(message, "success");
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const logout = createAsyncThunk("logout", async (_payload, thunkApi) => {
  try {
    thunkApi.dispatch(setLoading(true));
    const response = await http.post<ApiResponse<any>>(endPoints.logout, {});
    const { message } = response.data;
    toastService.showToast(message, "success");
    thunkApi.dispatch({ type: "logout/LOGOUT" });
    thunkApi.dispatch(setLoading(false));

    return response;
  } catch (error) {
    thunkApi.dispatch(setLoading(false));

    return thunkApi.rejectWithValue(error);
  } finally {
    thunkApi.dispatch(setLoading(false));
  }
});


export const getProfileDetails = createAsyncThunk(
  "auth/getProfileDetails",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const response = await http.get<ApiResponse<any>>(
        endPoints.getUserDetails
      );


      return response.data.data; // ✅ FIXED

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export default authSlice.reducer;
