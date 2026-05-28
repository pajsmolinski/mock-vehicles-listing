import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { VehiclesList } from "../vehicles-list";
import * as vehiclesService from "../../services/vehicles";
import "@testing-library/jest-dom";

// Mock the fetchVehicles function
jest.mock("../../services/vehicles", () => ({
  fetchVehicles: jest.fn(),
}));

// Mock the child components
jest.mock("../filters", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Filters: ({ onFiltersChange }: any) => (
    <div data-testid="filters">Filters Component</div>
  ),
}));

jest.mock("../ui/listHeader", () => ({
  ListHeader: () => <div data-testid="list-header">List Header</div>,
}));

jest.mock("../ui/listContainer", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ListContainer: ({ children }: any) => (
    <div data-testid="list-container">{children}</div>
  ),
}));

jest.mock("../ui/listItem", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ListItem: ({ item }: any) => <div data-testid="list-item">{item.make}</div>,
}));

const mockVehiclesResponse = {
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

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

describe("VehiclesList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render filters and list header", () => {
    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      mockVehiclesResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    expect(screen.getByTestId("filters")).toBeInTheDocument();
    expect(screen.getByTestId("list-header")).toBeInTheDocument();
  });

  it("should display vehicles when data is loaded", async () => {
    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      mockVehiclesResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(screen.getByText("Toyota")).toBeInTheDocument();
      expect(screen.getByText("Honda")).toBeInTheDocument();
    });
  });

  it("should call fetchVehicles with correct initial parameters", async () => {
    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      mockVehiclesResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(vehiclesService.fetchVehicles).toHaveBeenCalledWith({}, 1);
    });
  });

  it("should display error message when fetch fails", async () => {
    const errorMessage = "Failed to fetch vehicles";
    (vehiclesService.fetchVehicles as jest.Mock).mockRejectedValue(
      new Error(errorMessage),
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading vehicles/i)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
    });
  });

  it("should not display pagination when there is only one page", async () => {
    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      mockVehiclesResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(screen.queryByText("Previous")).not.toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
    });
  });

  it("should display pagination when there are multiple pages", async () => {
    const multiPageResponse = {
      ...mockVehiclesResponse,
      meta: {
        total: 20,
        page: 1,
        limit: 5,
        totalPages: 4,
      },
    };

    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      multiPageResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("Page 1 of 4")).toBeInTheDocument();
    });
  });

  it("should render list container with vehicles", async () => {
    (vehiclesService.fetchVehicles as jest.Mock).mockResolvedValue(
      mockVehiclesResponse,
    );

    renderWithQueryClient(<VehiclesList />);

    await waitFor(() => {
      expect(screen.getByTestId("list-container")).toBeInTheDocument();
      const listItems = screen.getAllByTestId("list-item");
      expect(listItems).toHaveLength(2);
    });
  });
});
