import type { Confirmation } from "@/redux/global.interface";
import { openDialog } from "@/redux/slices/global.slice";
import type { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const useConfirm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const confirm = ({ title, message, onConfirm }: Confirmation) => {
    dispatch(openDialog({ open: true, title, message, onConfirm }));
  };
  return confirm;
};

export default useConfirm;
