import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Confirmation, GlobalState } from "../global.interface";
import { http } from "@/api/http.service";
import endPoints from "@/api/endPoints";

const initialState: GlobalState = {
  loading: false,
  openConfirmationDialog: {
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  },
};

export const getPresignedUrl = createAsyncThunk(
  "globalSlice/imageUpload",
  async (payload: any, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));

      const body={
        filename: payload,
        uploadType : payload?.uploadType?? 'profile/',
      }

      const res = await http.post(endPoints.FILE_UPLOAD, body
      );
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

export const uploadFileToS3 = createAsyncThunk(
  "global/uploadFileToS3",
  async (payload: { preSignedUrl: string; file: File }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const res = await fetch(payload.preSignedUrl, {
        method: "PUT",
        body: payload.file,
        headers: {
          "Content-Type": payload.file.type,
        },
      });
      if (!res.ok) {
        throw new Error("File upload failed");
      }
      console.log(res);

      return {
        success: true,
        status: res.status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  },
);

const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialState,
  reducers: {
    setLoading: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    openDialog: (state, action: PayloadAction<Confirmation>) => {
      state.openConfirmationDialog.open = true;
      state.openConfirmationDialog.message = action.payload.message;
      state.openConfirmationDialog.title = action.payload.title;
      state.openConfirmationDialog.onConfirm = action.payload.onConfirm;
    },
    closeDialog: (state) => {
      state.openConfirmationDialog.open = false;
      state.openConfirmationDialog.message = "";
      state.openConfirmationDialog.title = "";
      state.openConfirmationDialog.onConfirm = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPresignedUrl.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setLoading, openDialog, closeDialog } = globalSlice.actions;

export const selectLoading = (state: RootState) => state.global.loading;

export default globalSlice.reducer;
