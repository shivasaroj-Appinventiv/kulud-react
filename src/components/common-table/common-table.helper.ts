import { useEffect, useState } from "react";
import { SortOrder, type PaginatedQuery } from "../../interfaces/api.interface";

interface UseCommonTableProps {
  pageOptions: PaginatedQuery;
  totalDocs: number;
  pageSize: number;
  handlePageOptionsChanged: (data: PaginatedQuery) => void;
}

export const useCommonTableHelper = ({
  pageOptions,
  totalDocs,
  pageSize,
  handlePageOptionsChanged,
}: UseCommonTableProps) => {
  const currentPage = pageOptions?.page ?? 1;
  const totalPages = Math.ceil(totalDocs / (pageOptions?.limit ?? pageSize));

  //  Search state
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //  Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  //  API trigger
  useEffect(() => {
    if (!debouncedSearch && !pageOptions.search) return;
    if (debouncedSearch === pageOptions.search) return;

    handlePageOptionsChanged({
      ...pageOptions,
      page: 1,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  //  Sorting
  const handleRequestSort = (property: string) => {
    const currentlySortedOn = pageOptions?.sortingBy === property;
    const currentlyAsc = pageOptions?.sortingType === SortOrder.ASC;

    const newOrder = currentlySortedOn
      ? currentlyAsc
        ? SortOrder.DESC
        : SortOrder.ASC
      : SortOrder.ASC;

    handlePageOptionsChanged({
      ...pageOptions,
      page: 1,
      sortingBy: property,
      sortingType: newOrder,
    });
  };

  // Pagination
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    handlePageOptionsChanged({
      ...pageOptions,
      page: newPage,
    });
  };

  // Page numbers
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  
  return {
    searchInput,
    setSearchInput,
    currentPage,
    totalPages,
    handleRequestSort,
    handlePageChange,
    getPageNumbers,
  };
};
