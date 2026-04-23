import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (val: string) => void;
}

const QuillEditor = ({ value, onChange }: QuillEditorProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="quill-custom"
      />
    </div>
  );
};

export default QuillEditor;