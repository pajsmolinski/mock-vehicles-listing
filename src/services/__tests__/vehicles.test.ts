import { fetchVehicles, fetchVehicleById, ApiError } from "../vehicles";

describe("vehicles service", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchVehicles", () => {
    const mockApiResponse = {
      status: "success",
      code: 200,
      result: [
        {
          id: "1",
          make: "Toyota",
          model: "Camry",
          vin: "1234567890",
          color: "Blue",
          fuel: "Gasoline",
          type: "Sedan",
          miles: 50000,
          year: 2020,
        },
        {
          id: "2",
          make: "Honda",
          model: "Civic",
          vin: "0987654321",
          color: "Red",
          fuel: "Gasoline",
          type: "Sedan",
          miles: 30000,
          year: 2021,
        },
      ],
      meta: {
        total: 2,
        page: 1,
        limit: 5,
        totalPages: 1,
      },
    };

    it("should fetch vehicles successfully with default parameters", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await fetchVehicles();

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain("page=1");
      expect(fetchUrl).toContain("limit=5");
      expect(result).toEqual(mockApiResponse);
    });

    it("should fetch vehicles with custom page and limit", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchVehicles({}, undefined, 2, 10);

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain("page=2");
      expect(fetchUrl).toContain("limit=10");
    });

    it("should include search filter in the request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchVehicles({ search: "Toyota" });

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain("globalSearch=Toyota");
    });

    it("should include color filter in the request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchVehicles({ color: "Blue" });

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain("color=Blue");
    });

    it("should not include 'All' filter values", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchVehicles({ color: "All", fuel: "All", type: "All" });

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).not.toContain("color=");
      expect(fetchUrl).not.toContain("fuel=");
      expect(fetchUrl).not.toContain("type=");
    });

    it("should include multiple filters in the request", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      await fetchVehicles({
        search: "Toyota",
        color: "Blue",
        fuel: "Gasoline",
        type: "Sedan",
      });

      const url = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(url).toContain("globalSearch=Toyota");
      expect(url).toContain("color=Blue");
      expect(url).toContain("fuel=Gasoline");
      expect(url).toContain("type=Sedan");
    });

    it("should throw ApiError when response is not ok", async () => {
      const errorData = { error: "Not found" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => errorData,
      });

      const error = await fetchVehicles().catch((e) => e);

      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toContain("Failed to fetch vehicles");
      expect(error.status).toBe(404);
    });

    it("should throw ApiError with network error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error"),
      );

      await expect(fetchVehicles()).rejects.toThrow(ApiError);
      await expect(fetchVehicles()).rejects.toThrow("Network error occurred");
    });
  });

  describe("fetchVehicleById", () => {
    const mockVehicle = {
      id: "1",
      make: "Toyota",
      model: "Camry",
      vin: "1234567890",
      color: "Blue",
      fuel: "Gasoline",
      type: "Sedan",
      miles: 50000,
      year: 2020,
    };

    it("should fetch a single vehicle by id successfully", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [mockVehicle] }),
      });

      const result = await fetchVehicleById("1");

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain("/1");
      expect(result).toEqual(mockVehicle);
    });

    it("should throw ApiError when vehicle is not found", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({ error: "Vehicle not found" }),
      });

      const error = await fetchVehicleById("999").catch((e) => e);

      expect(error).toBeInstanceOf(ApiError);
      expect(error.message).toContain("Failed to fetch vehicle");
      expect(error.status).toBe(404);
    });

    it("should throw ApiError with network error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Connection failed"),
      );

      await expect(fetchVehicleById("1")).rejects.toThrow(ApiError);
      await expect(fetchVehicleById("1")).rejects.toThrow(
        "Network error occurred",
      );
    });
  });

  describe("ApiError", () => {
    it("should create an ApiError with correct properties", () => {
      const error = new ApiError("Test error", 404, { detail: "Not found" });

      expect(error.message).toBe("Test error");
      expect(error.status).toBe(404);
      expect(error.data).toEqual({ detail: "Not found" });
      expect(error.name).toBe("ApiError");
    });
  });
});
