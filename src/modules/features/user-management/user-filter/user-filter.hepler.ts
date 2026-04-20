import { useState } from "react";

export const useUserFilterHelper = () => {
  const [filters, setFilters] = useState({
    status: [],
    createdFrom: "",
    createdTo: "",
  })
  ;
  return {};
};



export const toISTRangeUTC = (from: string | null, to: string | null) => {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // 330 minutes

  return {
    createdFrom: from
      ? new Date(new Date(from).getTime() - IST_OFFSET_MS).toISOString()  // start of day IST → UTC
      : null,
    createdTo: to
      ? new Date(new Date(to).getTime() - IST_OFFSET_MS + (24 * 60 * 60 * 1000) - 1).toISOString() // end of day IST → UTC
      : null,
  };
};