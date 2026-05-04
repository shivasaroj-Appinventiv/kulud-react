export interface Confirmation {
  open: boolean;
  title: string;
  message: string;
  onConfirm: null | (() => void) | Promise<void>;
}

export type GlobalState = {
  loading: boolean;
  openConfirmationDialog: Confirmation;
};

export interface Permission {
  action: string;
  id: string;
  module: string;
  name: string;
  status: string;
}
