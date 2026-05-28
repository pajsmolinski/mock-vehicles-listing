import { FilterParams } from "./vehicles";

export type SearchParams = {
  search?: string;
  color?: string;
  fuel?: string;
  type?: string;
  sort?: string;
  page?: string;
};

export function updateUrlState(
  filters: FilterParams,
  sort: string | undefined,
  page: number,
): string {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.color) params.set("color", filters.color);
  if (filters.fuel) params.set("fuel", filters.fuel);
  if (filters.type) params.set("type", filters.type);
  if (sort) params.set("sort", sort);
  if (page > 1) params.set("page", page.toString());

  const queryString = params.toString();
  const newUrl = queryString ? `?${queryString}` : "/";

  return newUrl;
}

export function readUrlState(params: SearchParams): {
  filters: FilterParams;
  sort?: string;
  page: number;
} {
  const filters: FilterParams = {
    search: params.search || undefined,
    color: params.color || undefined,
    fuel: params.fuel || undefined,
    type: params.type || undefined,
  };

  const sort = params.sort || undefined;
  const page = parseInt(params.page || "1", 10);

  return { filters, sort, page };
}
