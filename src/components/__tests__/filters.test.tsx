import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Filters } from "../filters";
import "@testing-library/jest-dom";

describe("Filters", () => {
  const mockOnFiltersChange = jest.fn();
  const mockOnSearchChange = jest.fn();
  const defaultFilters = { color: undefined, fuel: undefined, type: undefined };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all filter inputs", () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    expect(
      screen.getByPlaceholderText("Search by make, model, VIN, type..."),
    ).toBeInTheDocument();

    // Open filters to see the labels
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);

    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Fuel Type")).toBeInTheDocument();
    expect(screen.getByText("Vehicle Type")).toBeInTheDocument();
  });

  it("should toggle filters section when Filters button is clicked", () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    const filterButton = screen.getByText("Filters");

    // Initially filters should be closed
    expect(screen.queryAllByRole("combobox").length).toBe(0);

    fireEvent.click(filterButton);

    // After opening, should show filter controls
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.queryAllByRole("combobox").length).toBeGreaterThan(0);
  });

  it("should call onSearchChange when search input changes", () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      "Search by make, model, VIN, type...",
    );

    fireEvent.change(searchInput, { target: { value: "Toyota" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("Toyota");
  });

  it("should call onFiltersChange when color is changed", async () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    // Open filters first
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);

    const colorSelect = screen.getAllByRole("combobox")[0];

    fireEvent.change(colorSelect, { target: { value: "Black" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "Black",
        }),
      );
    });
  });

  it("should call onFiltersChange when fuel type is changed", async () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    // Open filters first
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);

    const fuelSelect = screen.getAllByRole("combobox")[1];

    fireEvent.change(fuelSelect, { target: { value: "Electric" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          fuel: "Electric",
        }),
      );
    });
  });

  it("should call onFiltersChange when vehicle type is changed", async () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={defaultFilters}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    // Open filters first
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);

    const typeSelect = screen.getAllByRole("combobox")[2];

    fireEvent.change(typeSelect, { target: { value: "SUV" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "SUV",
        }),
      );
    });
  });

  it("should clear all filters when Clear all button is clicked", async () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={{ color: "Red", fuel: "Diesel", type: "SUV" }}
        search="Toyota"
        onSearchChange={mockOnSearchChange}
      />,
    );

    const clearButton = screen.getByText("Clear all");

    fireEvent.click(clearButton);

    expect(mockOnSearchChange).toHaveBeenCalledWith("");
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      color: null,
      fuel: null,
      type: null,
    });
  });

  it("should not include 'All' values in filter params", async () => {
    render(
      <Filters
        onFiltersChange={mockOnFiltersChange}
        filters={{ color: "Red", fuel: undefined, type: undefined }}
        search=""
        onSearchChange={mockOnSearchChange}
      />,
    );

    // Open filters first
    const filterButton = screen.getByText("Filters");
    fireEvent.click(filterButton);

    const colorSelect = screen.getAllByRole("combobox")[0];

    // Select a color
    fireEvent.change(colorSelect, { target: { value: "Red" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "Red",
        }),
      );
    });

    // Change back to All
    fireEvent.change(colorSelect, { target: { value: "All" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          color: undefined,
        }),
      );
    });
  });
});
