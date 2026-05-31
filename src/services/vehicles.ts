export interface Vehicle {
  id: string;
  make: string;
  model: string;
  vin: string;
  color: string;
  fuel: string;
  type: string;
  miles: number;
  year: number;
}

export interface FilterParams {
  search?: string;
  color?: string;
  fuel?: string;
  type?: string;
}

export interface ApiResponse<T> {
  status: string;
  code: number;
  result: T;
  meta: {
    total: number;
    page: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchVehicles(
  filters?: FilterParams,
  sort?: string,
  page: number = 1,
  limit: number = 5,
  searchMode: "AND" | "OR" = "AND",
): Promise<ApiResponse<Vehicle[]>> {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.search) params.append("globalSearch", filters.search);
    if (filters.color && filters.color !== "All")
      params.append("color", filters.color);
    if (filters.fuel && filters.fuel !== "All")
      params.append("fuel", filters.fuel);
    if (filters.type && filters.type !== "All")
      params.append("type", filters.type);

    if (Array.from(params.keys()).length > 1) {
      params.append("searchMode", searchMode);
    }
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (sort) {
    const [sortField, sortOrder] = sort.split("_");
    params.append("sortBy", sortField);
    params.append("sortOrder", sortOrder);
  }

  try {
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch vehicles: ${response.statusText}`,
        response.status,
        await response.json().catch(() => null),
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred", 0, error);
  }
}

export async function fetchVehicleById(
  id: string,
): Promise<ApiResponse<Vehicle[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new ApiError(
        `Failed to fetch vehicle: ${response.statusText}`,
        response.status,
        await response.json().catch(() => null),
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Network error occurred", 0, error);
  }
}
