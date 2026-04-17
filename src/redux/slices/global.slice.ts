import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Confirmation {
  open: boolean;
  message: string;
  onConfirm: null | (() => void);
}

type GlobalState = {
  loading: boolean;
  openConfirmationDialog: Confirmation;
};

const initialState: GlobalState = {
  loading: false,
  openConfirmationDialog: {
    open: false,
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
      state.openConfirmationDialog.onConfirm = action.payload.onConfirm;
    },
    closeDialog: (state) => {
      state.openConfirmationDialog.open = false;
      state.openConfirmationDialog.message = "";
      state.openConfirmationDialog.onConfirm = null;
    },
  },
});

export const { setLoading,openDialog,closeDialog } = globalSlice.actions;

export const selectLoading = (state: RootState) => state.global.loading;

export default globalSlice.reducer;
