import QuillEditor from "@/components/editor";
import useAboutUsHelper from "./about-us.helper";

const AboutUs = () => {
  const { value, setValue, onUpdateClick, isDirty, loading, isNew } =
    useAboutUsHelper();

  return (
    <div className="space-y-4">
      <QuillEditor value={value} onChange={setValue} />

      <div className="flex justify-end">
        <button
          onClick={onUpdateClick}
          disabled={!isDirty || loading}
          className={`px-6 py-2 rounded-lg text-white transition cursor-pointer disabled:cursor-not-allowed ${
            !isDirty || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isNew ? "Add Content" : "Update Content"}
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
