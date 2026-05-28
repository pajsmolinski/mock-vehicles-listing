import { updateUrlState, readUrlState, SearchParams } from "../urlParams";
import type { FilterParams } from "../vehicles";

describe("urlParams utilities", () => {
  describe("updateUrlState", () => {
    it("should return '/' when no filters, sort, or page", () => {
      const filters: FilterParams = {};
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("/");
    });

    it("should include search filter in URL", () => {
      const filters: FilterParams = { search: "Toyota" };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?search=Toyota");
    });

    it("should include color filter in URL", () => {
      const filters: FilterParams = { color: "Blue" };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?color=Blue");
    });

    it("should include fuel filter in URL", () => {
      const filters: FilterParams = { fuel: "Electric" };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?fuel=Electric");
    });

    it("should include type filter in URL", () => {
      const filters: FilterParams = { type: "SUV" };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?type=SUV");
    });

    it("should include sort parameter in URL", () => {
      const filters: FilterParams = {};
      const result = updateUrlState(filters, "year_DESC", 1);
      expect(result).toBe("?sort=year_DESC");
    });

    it("should not include page 1 in URL", () => {
      const filters: FilterParams = {};
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("/");
    });

    it("should include page when greater than 1", () => {
      const filters: FilterParams = {};
      const result = updateUrlState(filters, undefined, 2);
      expect(result).toBe("?page=2");
    });

    it("should combine multiple filters", () => {
      const filters: FilterParams = {
        search: "Honda",
        color: "Red",
        fuel: "Gasoline",
      };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toContain("search=Honda");
      expect(result).toContain("color=Red");
      expect(result).toContain("fuel=Gasoline");
    });

    it("should combine all parameters including sort and page", () => {
      const filters: FilterParams = {
        search: "Civic",
        color: "Blue",
        fuel: "Hybrid",
        type: "Sedan",
      };
      const result = updateUrlState(filters, "miles_ASC", 3);
      expect(result).toContain("search=Civic");
      expect(result).toContain("color=Blue");
      expect(result).toContain("fuel=Hybrid");
      expect(result).toContain("type=Sedan");
      expect(result).toContain("sort=miles_ASC");
      expect(result).toContain("page=3");
    });

    it("should encode special characters in search query", () => {
      const filters: FilterParams = { search: "Toyota Camry 2020" };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?search=Toyota+Camry+2020");
    });

    it("should skip undefined filter values", () => {
      const filters: FilterParams = {
        search: "Toyota",
        color: undefined,
        fuel: undefined,
      };
      const result = updateUrlState(filters, undefined, 1);
      expect(result).toBe("?search=Toyota");
      expect(result).not.toContain("color");
      expect(result).not.toContain("fuel");
    });
  });

  describe("readUrlState", () => {
    it("should return empty filters when no params", () => {
      const params: SearchParams = {};
      const result = readUrlState(params);
      expect(result.filters).toEqual({
        search: undefined,
        color: undefined,
        fuel: undefined,
        type: undefined,
      });
      expect(result.sort).toBeUndefined();
      expect(result.page).toBe(1);
    });

    it("should parse search parameter", () => {
      const params: SearchParams = { search: "Toyota" };
      const result = readUrlState(params);
      expect(result.filters.search).toBe("Toyota");
    });

    it("should parse color parameter", () => {
      const params: SearchParams = { color: "Blue" };
      const result = readUrlState(params);
      expect(result.filters.color).toBe("Blue");
    });

    it("should parse fuel parameter", () => {
      const params: SearchParams = { fuel: "Electric" };
      const result = readUrlState(params);
      expect(result.filters.fuel).toBe("Electric");
    });

    it("should parse type parameter", () => {
      const params: SearchParams = { type: "SUV" };
      const result = readUrlState(params);
      expect(result.filters.type).toBe("SUV");
    });

    it("should parse sort parameter", () => {
      const params: SearchParams = { sort: "year_DESC" };
      const result = readUrlState(params);
      expect(result.sort).toBe("year_DESC");
    });

    it("should parse page parameter", () => {
      const params: SearchParams = { page: "5" };
      const result = readUrlState(params);
      expect(result.page).toBe(5);
    });

    it("should default to page 1 when page is not provided", () => {
      const params: SearchParams = {};
      const result = readUrlState(params);
      expect(result.page).toBe(1);
    });

    it("should default to page 1 when page is invalid", () => {
      const params: SearchParams = { page: "invalid" };
      const result = readUrlState(params);
      expect(result.page).toBeNaN();
    });

    it("should parse all parameters together", () => {
      const params: SearchParams = {
        search: "Civic",
        color: "Red",
        fuel: "Hybrid",
        type: "Sedan",
        sort: "miles_ASC",
        page: "3",
      };
      const result = readUrlState(params);
      expect(result.filters).toEqual({
        search: "Civic",
        color: "Red",
        fuel: "Hybrid",
        type: "Sedan",
      });
      expect(result.sort).toBe("miles_ASC");
      expect(result.page).toBe(3);
    });

    it("should handle empty string parameters as undefined", () => {
      const params: SearchParams = {
        search: "",
        color: "",
        fuel: "",
        type: "",
      };
      const result = readUrlState(params);
      expect(result.filters).toEqual({
        search: undefined,
        color: undefined,
        fuel: undefined,
        type: undefined,
      });
    });
  });

  describe("round-trip conversion", () => {
    it("should maintain state through read-update cycle", () => {
      const originalParams: SearchParams = {
        search: "Toyota",
        color: "Blue",
        fuel: "Hybrid",
        type: "Sedan",
        sort: "year_DESC",
        page: "2",
      };

      const { filters, sort, page } = readUrlState(originalParams);
      const url = updateUrlState(filters, sort, page);

      // Parse the URL back
      const urlParams = new URLSearchParams(url.replace("?", ""));
      const roundTripParams: SearchParams = {
        search: urlParams.get("search") || undefined,
        color: urlParams.get("color") || undefined,
        fuel: urlParams.get("fuel") || undefined,
        type: urlParams.get("type") || undefined,
        sort: urlParams.get("sort") || undefined,
        page: urlParams.get("page") || undefined,
      };

      const roundTrip = readUrlState(roundTripParams);

      expect(roundTrip.filters).toEqual(filters);
      expect(roundTrip.sort).toEqual(sort);
      expect(roundTrip.page).toEqual(page);
    });

    it("should handle defaults correctly in round-trip", () => {
      const originalParams: SearchParams = {};

      const { filters, sort, page } = readUrlState(originalParams);
      const url = updateUrlState(filters, sort, page);

      expect(url).toBe("/");

      const urlParams = new URLSearchParams(url.replace("?", ""));
      const roundTripParams: SearchParams = {
        search: urlParams.get("search") || undefined,
        color: urlParams.get("color") || undefined,
        fuel: urlParams.get("fuel") || undefined,
        type: urlParams.get("type") || undefined,
        sort: urlParams.get("sort") || undefined,
        page: urlParams.get("page") || undefined,
      };

      const roundTrip = readUrlState(roundTripParams);

      expect(roundTrip.filters).toEqual(filters);
      expect(roundTrip.sort).toEqual(sort);
      expect(roundTrip.page).toEqual(page);
    });
  });
});
