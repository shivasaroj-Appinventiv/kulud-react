export interface Confirmation {
  open: boolean;
  title:string,
  message: string;
  onConfirm: null | (() => void)|Promise<void>;
}

export type GlobalState = {
  loading: boolean;
  openConfirmationDialog: Confirmation;
};