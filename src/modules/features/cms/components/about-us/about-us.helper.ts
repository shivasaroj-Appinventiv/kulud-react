import { useAppSelector, type AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCms, updateCms } from "../../cms.slice";
import useConfirm from "@/hooks/useConfirm";
import { COMMON_MESSAGES } from "@/constants/messages";

const useAboutUsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [loading, setLoading] = useState(false);
  const cms = useAppSelector((state) => state.cms.cms);
  const confirm = useConfirm();
  useEffect(() => {
    if (cms) {
      setValue(cms.aboutUsEn);
      setInitialValue(cms.aboutUsEn);
    }
  }, [cms]);
  useEffect(() => {
    dispatch(getCms("ABOUT_US"));
  }, [dispatch]);

  const isDirty = value !== initialValue;
  const isNew = !initialValue;

  const handleSubmit = async () => {
    const payload = {
      aboutUsEn: value,
    };
    setLoading(true);
    await dispatch(updateCms(payload)).unwrap();
    dispatch(getCms("ABOUT_US"));
    setLoading(false);
  };

  const onUpdateClick = () => {
    const data = {
      title: COMMON_MESSAGES.COMMON_CONFIRMATION.title("About Us"),
      message: COMMON_MESSAGES.COMMON_CONFIRMATION.confirm(
        `${isNew ? "Add" : "update"} about us`,
      ),
      onConfirm: handleSubmit,
      open: true,
    };
    confirm(data);
  };

  return { value, setValue, onUpdateClick, isDirty, loading, isNew };
};

export default useAboutUsHelper;
