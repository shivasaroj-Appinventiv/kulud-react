import { SortOrder } from "../../interfaces/api.interface";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ListFilterIcon,
} from "lucide-react";
import { useCommonTableHelper } from "./common-table.helper";
import type { CommonTableProps } from "./common-table.interfe";
import { Skeleton } from "@mui/material";

const CommonTableComponent = <T,>({
  columns,
  searchPlaceHolder,
  data,
  onRowClick,
  loading = false,
  pageOptions,
  totalDocs,
  handlePageOptionsChanged,
  pageSize = 10,
  title,
  children,
  onToggleFilter,
  isFilterApplied,
}: CommonTableProps<T>) => {
  const {
    searchInput,
    setSearchInput,
    currentPage,
    totalPages,
    handleRequestSort,
    handlePageChange,
    getPageNumbers,
  } = useCommonTableHelper({
    pageOptions,
    totalDocs,
    pageSize,
    handlePageOptionsChanged,
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl  shadow-sm">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          {title && (
            <h2 className="text-[15px] font-semibold text-gray-900">{title}</h2>
          )}
          <p className="text-[13px] text-gray-400 mt-0.5">
            {totalDocs} total record{totalDocs !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Search */}

        <div className="filter flex item-center gap-2 relative">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchInput}
              placeholder={searchPlaceHolder || "Search..."}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9 pr-4 h-9 w-60 text-sm bg-gray-50 border border-gray-200 rounded-lg
                       placeholder:text-gray-400 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                       transition-all duration-150"
            />
          </div>

          <button
            onClick={onToggleFilter}
            className={`h-9 w-9 flex items-center justify-center border rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer ${
              isFilterApplied ? "bg-blue-100 text-blue-600" : "bg-gray-50"
            }`}
          >
            <ListFilterIcon />
          </button>

          {children}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col, i) => {
                const isSorted = pageOptions?.sortingBy === col.sortKey;
                const isAsc = pageOptions?.sortingType === SortOrder.ASC;

                return (
                  <th
                    key={i}
                    onClick={() =>
                      col.sortable && handleRequestSort(col.sortKey as string)
                    }
                    className={`px-5 py-3 text-left text-[11px] font-semibold tracking-wider uppercase
                                text-gray-500 whitespace-nowrap
                                ${col.sortable ? "cursor-pointer hover:text-gray-800 select-none" : ""}`}
                    aria-sort={
                      isSorted ? (isAsc ? "ascending" : "descending") : "none"
                    }
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span
                          className={`flex flex-col gap-[1px] transition-colors ${isSorted ? "text-blue-500" : "text-gray-300"}`}
                        >
                          <ChevronUp
                            size={10}
                            className={
                              isSorted && isAsc
                                ? "text-blue-500"
                                : "text-gray-300"
                            }
                          />
                          <ChevronDown
                            size={10}
                            className={
                              isSorted && !isAsc
                                ? "text-blue-500"
                                : "text-gray-300"
                            }
                            style={{ marginTop: "-4px" }}
                          />
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {loading ? (
              // <tr>
              //   <td colSpan={columns.length} className="py-16 text-center">
              //     <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              //       <Loader2 size={16} className="animate-spin text-blue-500" />
              //       <span>Loading...</span>
              //     </div>
              //           </td>
              //       </tr>

              <>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      {columns.map((column, colIndex) => (
                        <td key={colIndex} className="px-5 py-3.5">
                          <Skeleton />
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">
                      No results found
                    </p>
                    {searchInput.length > 0 && (
                      <p className="text-xs text-gray-300">
                        Try adjusting your search
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.map((row: any, rowIndex: number) => (
                <tr
                  key={row.id ?? rowIndex}
                  onClick={() => onRowClick(row)}
                  className="hover:bg-blue-50/40 transition-colors duration-100 group"
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {columns.map((col: any, colIndex: number) => (
                    <td
                      key={colIndex}
                      className="px-5 py-3.5 text-gray-700 group-hover:text-gray-900 transition-colors"
                    >
                      {col.render
                        ? col.render(row)
                        : col.resolve
                          ? col.resolve(row)
                          : (row as any)[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="px-6 py-3.5 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[13px] text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-700">{currentPage}</span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {totalPages || 1}
            </span>
          </p>

          <div className="flex items-center gap-1">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200
                         text-gray-500 hover:bg-gray-50 hover:text-gray-800 cursor-pointer
                         disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="h-8 w-8 flex items-center justify-center text-gray-300 text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p as number)}
                  disabled={loading}
                  className={`h-8 w-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${
                      currentPage === p
                        ? "bg-blue-500 text-white border border-blue-500 shadow-sm shadow-blue-200"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                    disabled:cursor-not-allowed`}
                >
                  {p}
                </button>
              ),
            )}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-gray-200 cursor-pointer
                         text-gray-500 hover:bg-gray-50 hover:text-gray-800
                         disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonTableComponent;
