import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCms, updateCms } from "../../cms.slice";
import { COMMON_MESSAGES } from "@/constants/messages";
import useConfirm from "@/hooks/useConfirm";

const userPrivacyPolicyHelper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [value, setValue] = useState("");
  const [initialValue, setInitialValue] = useState("");
  const [loading, setLoading] = useState(false);
  const confirm = useConfirm();
  useEffect(() => {
    const fetchCms = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getCms("PRIVACY_POLICY")).unwrap();

        const content = res?.privacyEn || "";
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
          privacyEn: value,
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
      title: COMMON_MESSAGES.COMMON_CONFIRMATION.title("Privacy Policy"),
      message: COMMON_MESSAGES.COMMON_CONFIRMATION.confirm(
        `${isNew ? "Add" : "update"} privacy policy`,
      ),
      onConfirm: handleSubmit,
      open: true,
    };
    confirm(data);
  };

  return { value, setValue, onUpdateClick, isDirty, loading, isNew };
};

export default userPrivacyPolicyHelper;
