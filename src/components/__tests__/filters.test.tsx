import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { Filters } from "../filters";
import "@testing-library/jest-dom";

describe("Filters", () => {
  const mockOnFiltersChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all filter inputs", () => {
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByText("Fuel Type")).toBeInTheDocument();
    expect(screen.getByText("Vehicle Type")).toBeInTheDocument();
  });

  it("should toggle filters section when Filters button is clicked", () => {
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

    const filterButton = screen.getByText("Filters");

    // Initially filters should be visible
    expect(screen.getByText("Color")).toBeInTheDocument();

    fireEvent.click(filterButton);

    // After closing, the dropdown options should not be in the document
    const colorSelects = screen.queryAllByRole("combobox");
    expect(colorSelects.length).toBe(0);
  });

  it("should call onFiltersChange with debounced search query", async () => {
    jest.useFakeTimers();

    render(<Filters onFiltersChange={mockOnFiltersChange} />);

    const searchInput = screen.getByPlaceholderText("Search...");

    // Initial render will call with empty filters
    expect(mockOnFiltersChange).toHaveBeenCalledTimes(1);
    mockOnFiltersChange.mockClear();

    fireEvent.change(searchInput, { target: { value: "Toyota" } });

    // Should not call immediately after clear
    expect(mockOnFiltersChange).not.toHaveBeenCalled();

    // Fast forward time by 500ms (debounce time)
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith({
        search: "Toyota",
        color: undefined,
        fuel: undefined,
        type: undefined,
      });
    });

    jest.useRealTimers();
  });

  it("should call onFiltersChange when color is changed", async () => {
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

    const colorSelect = screen.getAllByRole("combobox")[0];

    fireEvent.change(colorSelect, { target: { value: "Blue" } });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          color: "Blue",
        }),
      );
    });
  });

  it("should call onFiltersChange when fuel type is changed", async () => {
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

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
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

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
    jest.useFakeTimers();

    render(<Filters onFiltersChange={mockOnFiltersChange} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    const colorSelect = screen.getAllByRole("combobox")[0];
    const clearButton = screen.getByText("Clear all");

    // Clear initial calls
    mockOnFiltersChange.mockClear();

    // Set some filters
    fireEvent.change(searchInput, { target: { value: "Toyota" } });
    fireEvent.change(colorSelect, { target: { value: "Blue" } });

    // Clear all
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(colorSelect).toHaveValue("All");

    // Fast forward debounce
    await act(async () => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(mockOnFiltersChange).toHaveBeenCalledWith(
        expect.objectContaining({
          search: undefined,
          color: undefined,
          fuel: undefined,
          type: undefined,
        }),
      );
    });

    jest.useRealTimers();
  });

  it("should not include 'All' values in filter params", async () => {
    render(<Filters onFiltersChange={mockOnFiltersChange} />);

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
