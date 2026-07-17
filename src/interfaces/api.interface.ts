
export interface ApiResponse<T = any> {
  message: string;
  status: number;
  success:boolean,
  result: T;
  data?: T;
}
export type ApiState = 'loading' | 'succeeded' | 'failed' | 'idle';

export const SortOrder = {
  ASC: "1",
  DESC: "2",
} as const;

export interface PaginatedQuery {
  page: number;
  limit: number;
  search?: string;
  sortingBy?: string;
  sortingType?: typeof SortOrder[keyof typeof SortOrder];
  filters?: any;
}

export interface PaginatedResponse<T = any> {
  [x: string]: unknown;
  totalDocs?: number;
  data?: Array<T>;
  docs?: Array<T>;
  limit?: number;
  page?: number;
}


