import { http } from "@/api/http.service";
import type { ApiResponse } from "@/interfaces/api.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CmsContent,
  CmsState,
  CmsType,
} from "./cms.interface";
import { setLoading } from "@/redux/slices/global.slice";
import endPoints from "@/api/endPoints";
import { toastService } from "@/utils/toast.service";

// ✅ Initial State

const initialState: CmsState = {
  cms: null,
  loading: false,
  error: null,
};

export const getCms = createAsyncThunk<CmsContent, CmsType>(
  "cms/getCms",
  async (type, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const res = await http.get<ApiResponse<CmsContent>>(
        endPoints.APPLICATION_CMS,
        { contentType: type }
      );

      return res.data.data; // ✅ always returns CmsContent
    } catch (error) {
      return thunkAPI.rejectWithValue(error) as any; // ✅ force type
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const updateCms = createAsyncThunk<any>(
  "cms/updateCms",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
      const res = await http.put<ApiResponse<CmsContent>>(
        `${endPoints.APPLICATION_CMS}`,
        payload,
      );
      toastService.showToast(res.data.message,'success');
      return res.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || "Error");
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

// ==============================
// ✅ SLICE
// ==============================
const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    resetCms: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      // 🔹 GET CMS
      .addCase(getCms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCms.fulfilled, (state, action) => {
        state.loading = false;
        state.cms = action.payload;
      })
      .addCase(getCms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 UPDATE CMS
      .addCase(updateCms.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCms.fulfilled, (state, action) => {
        state.loading = false;
        // state.data[action.payload.type] = action.payload;
      })
      .addCase(updateCms.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload as string;
      });
  },
});

export const { resetCms } = cmsSlice.actions;
export default cmsSlice.reducer;
