import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { toISTRangeUTC } from "./user-filter.hepler";

interface FilterValues {
  status: string[];
  createdFrom: string | null;
  createdTo: string | null;
}

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active", dot: "bg-emerald-400" },
  { value: "INACTIVE", label: "Inactive", dot: "bg-gray-300" },
];

const UserFilter = ({
  initialValues,
  onApply,
  onClose,
  isApplied,
}: {
  initialValues: FilterValues;
  onApply: (values: FilterValues) => void;
  onClose: () => void;
  isApplied: boolean;
}) => {
  const [statusOpen, setStatusOpen] = useState(true);
  const handleApply = (values: FilterValues) => {
    const { createdFrom, createdTo } = toISTRangeUTC(values.createdFrom, values.createdTo);
    onApply({ ...values, createdFrom, createdTo }); // ✅ sends ISO UTC strings to API
  };
  const formik = useFormik<FilterValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      createdFrom: Yup.date().nullable(),
      createdTo: Yup.date()
        .nullable()
        .min(Yup.ref("createdFrom"), "To date must be after From date"),
    }),
    onSubmit: handleApply,
  });

  const handleStatusChange = (status: string) => {
    const current = formik.values.status;
    const updated = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    formik.setFieldValue("status", updated);
  };

  // const handleFilterReset = () => {
  //   formik.resetForm();
  //   onClose();
  //   if(isApplied){
  //       onApply({status:[],createdFrom:null,createdTo:null});
  //   }
  // };

  const handleFilterReset = () => {
  const empty = { status: [], createdFrom: null, createdTo: null };
  formik.resetForm({ values: empty });
  if (isApplied) {
    onApply(empty); // resets pageOptions in parent first
  }
  onClose();       // then close
};

  const activeCount =
    formik.values.status.length +
    (formik.values.createdFrom ? 1 : 0) +
    (formik.values.createdTo ? 1 : 0);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-800">Filters</span>
          {activeCount > 0 && (
            <span className="text-[11px] font-semibold bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={15} />
        </button>
      </div>

      <div className="px-4 py-2">

        {/* Status Section */}
        <div className="border-b border-gray-100">
          <button
            type="button"
            onClick={() => setStatusOpen(!statusOpen)}
            className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Status
              </span>
              {formik.values.status.length > 0 && (
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-500 rounded-full px-1.5 py-0.5">
                  {formik.values.status.length}
                </span>
              )}
            </div>
            {statusOpen
              ? <ChevronUp size={14} className="text-gray-400" />
              : <ChevronDown size={14} className="text-gray-400" />
            }
          </button>

          {statusOpen && (
            <div className="pb-3 flex flex-col gap-1">
              {STATUS_OPTIONS.map(({ value, label, dot }) => {
                const checked = formik.values.status.includes(value);
                return (
                  <label
                    key={value}
                    className={`flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer transition-colors
                      ${checked ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors flex-shrink-0
                        ${checked ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"}`}
                    >
                      {checked && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => handleStatusChange(value)}
                    />
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      <span className="text-sm text-gray-700">{label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Date Range Section */}
        {/* <div>
          <button
            type="button"
            onClick={() => setDateOpen(!dateOpen)}
            className="w-full flex items-center justify-between py-3 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Date Range
              </span>
              {(formik.values.createdFrom || formik.values.createdTo) && (
                <span className="text-[10px] font-semibold bg-blue-50 text-blue-500 rounded-full px-1.5 py-0.5">
                  set
                </span>
              )}
            </div>
            {dateOpen
              ? <ChevronUp size={14} className="text-gray-400" />
              : <ChevronDown size={14} className="text-gray-400" />
            }
          </button>

          {dateOpen && (
            <div className="pb-3 flex flex-col gap-2.5">
              <div>
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1 block">
                  From
                </label>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors
                  ${formik.touched.createdFrom && formik.errors.createdFrom
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus-within:border-blue-400 focus-within:bg-white"
                  }`}>
                  <CalendarDays size={14} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="date"
                    value={formik.values.createdFrom || ""}
                    onChange={(e) => formik.setFieldValue("createdFrom", e.target.value || null)}
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none min-w-0 cursor-pointer"
                  />
                  {formik.values.createdFrom && (
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("createdFrom", null)}
                      className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                {formik.touched.createdFrom && formik.errors.createdFrom && (
                  <p className="text-[11px] text-red-500 mt-1 ml-1">{formik.errors.createdFrom as string}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-medium text-gray-400 uppercase tracking-wide mb-1 block">
                  To
                </label>
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors
                  ${formik.touched.createdTo && formik.errors.createdTo
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus-within:border-blue-400 focus-within:bg-white"
                  }`}>  
                  <CalendarDays size={14} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="date"
                    value={formik.values.createdTo || ""}
                    onChange={(e) => formik.setFieldValue("createdTo", e.target.value || null)}
                    className="flex-1 bg-transparent text-sm text-gray-800 outline-none min-w-0 cursor-pointer"
                  />
                  {formik.values.createdTo && (
                    <button
                      type="button"
                      onClick={() => formik.setFieldValue("createdTo", null)}
                      className="text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                {formik.touched.createdTo && formik.errors.createdTo && (
                  <p className="text-[11px] text-red-500 mt-1 ml-1">{formik.errors.createdTo as string}</p>
                )}
              </div>
            </div>
          )}
        </div> */}
      </div>

      {/* Footer */}
      <div className="flex gap-2 px-4 py-3 border-t border-gray-100 bg-gray-50">
        <button
          type="button"
          onClick={isApplied ? handleFilterReset : onClose}
          className="flex-1 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200
                     rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
        >
          {isApplied ? "Reset" : "Close"}
        </button>
        <button
          type="submit"
          className="flex-1 py-2 text-sm font-semibold text-white bg-blue-500 cursor-pointer
                     rounded-xl hover:bg-blue-600 active:scale-95 transition-all"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default UserFilter;