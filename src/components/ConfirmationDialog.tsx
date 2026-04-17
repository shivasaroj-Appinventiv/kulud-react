import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle className="text-lg font-semibold">
        Confirm Action
      </DialogTitle>
      <DialogContent>
        <p className="text-gray-700">{message}</p>
      </DialogContent>
      <DialogActions className="px-4 pb-4">
        <Button
          className="!text-gray-600 !border !border-gray-300 !capitalize"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          className="!bg-red-500 !text-white hover:!bg-red-600 !capitalize"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
