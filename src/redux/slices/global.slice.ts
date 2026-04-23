import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Confirmation, GlobalState } from "../global.interface";



const initialState: GlobalState = {
  loading: false,
  openConfirmationDialog: {
    open: false,
    title:"",
    message: "",
    onConfirm: null,
  },
};

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
      state.openConfirmationDialog.title= "";
      state.openConfirmationDialog.onConfirm = null;
    },
  },
});

export const { setLoading,openDialog,closeDialog } = globalSlice.actions;

export const selectLoading = (state: RootState) => state.global.loading;

export default globalSlice.reducer;
