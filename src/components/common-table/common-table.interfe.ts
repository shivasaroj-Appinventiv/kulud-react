import type { PaginatedQuery } from "../../interfaces/api.interface";

export type Column<T> = {
  sortKey?: string;
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
};

export interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick: (row: T) => void;
  pageSize?: number;
  loading?: boolean;
  pageOptions: PaginatedQuery;
  totalDocs: number;
  searchPlaceHolder?:string,
  handlePageOptionsChanged: (data: PaginatedQuery) => void;
  title?: string;
}