import type { PaginatedQuery } from "../interfaces/api.interface";

export const DEFAULT_PAGE_OPTIONS: PaginatedQuery = {
  page: 1,
  limit: 10
};
export const BASIC_AUTH_USERNAME = 'my_mylz_2024';
export const BASIC_AUTH_PASSWORD = 'jZ15i7H9wtcYSf3S';

export const getBasicAuth = () => btoa(BASIC_AUTH_USERNAME + ':' + BASIC_AUTH_PASSWORD);
