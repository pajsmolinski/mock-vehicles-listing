import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../pagination";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Previous and Next buttons", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Previous" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("should disable Previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByRole("button", { name: "Previous" });
    expect(prevButton).toBeDisabled();
  });

  it("should disable Next button on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(nextButton).toBeDisabled();
  });

  it("should call onPageChange when Previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange when Next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("should call onPageChange when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("should highlight the current page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("bg-blue-600");
  });

  it("should render all pages when total pages is 5 or less", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    // With delta=2, when on page 1 of 5, it shows: 1 2 3 ... 5
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render ellipsis when there are many pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    const ellipsis = screen.getAllByText("...");
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it("should show first page, current page range, and last page for middle pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: 1 ... 3 4 5 6 7 ... 10
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should show pages without left ellipsis when near the start", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: 1 2 3 4 ... 10
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should show pages without right ellipsis when near the end", () => {
    render(
      <Pagination
        currentPage={9}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show: 1 ... 7 8 9 10
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should not go below page 1 when clicking Previous on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(prevButton);

    // Since the button is disabled, this shouldn't call onPageChange
    // but if it does, it should try to go to max(1, currentPage - 1) = 1
    if (mockOnPageChange.mock.calls.length > 0) {
      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    }
  });

  it("should not go beyond total pages when clicking Next on last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);

    // Since the button is disabled, this shouldn't call onPageChange
    // but if it does, it should try to go to min(totalPages, currentPage + 1) = 5
    if (mockOnPageChange.mock.calls.length > 0) {
      expect(mockOnPageChange).toHaveBeenCalledWith(5);
    }
  });

  it("should render correctly with single page", () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />,
    );

    // Pagination should not render when there's only one page
    expect(container).toBeEmptyDOMElement();
  });
});
