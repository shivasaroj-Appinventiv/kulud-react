import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCms, updateCms } from "../../cms.slice";
import useConfirm from "@/hooks/useConfirm";
import { COMMON_MESSAGES } from "@/constants/messages";

const useTermsAndConditionsHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();

  useEffect(() => {
    const fetchCms = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getCms("TERMS_CONDITIONS")).unwrap();

        const content = res?.termsEn || "";
        setValue(content);
        setInitialValue(content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCms();
  }, [dispatch]);

  const isDirty = value !== initialValue;
  const isNew = !initialValue;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await dispatch(
        updateCms({
          termsEn: value,
        }),
      ).unwrap();

      // ✅ reset tracking after save
      setInitialValue(value);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdateClick = () => {
    const data = {
      title: COMMON_MESSAGES.COMMON_CONFIRMATION.title("Terms And Conditions"),
      message: COMMON_MESSAGES.COMMON_CONFIRMATION.confirm(
        `${isNew ? "Add" : "update"} terms and conditions`,
      ),
      onConfirm: handleSubmit,
      open: true,
    };
    confirm(data);
  };
  return {
    value,
    setValue,
    handleSubmit: onUpdateClick,
    isDirty,
    loading,
    isNew,
  };
};

export default useTermsAndConditionsHelper;
