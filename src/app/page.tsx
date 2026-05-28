import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { VehiclesList } from "@/src/components/vehicles-list";
import { fetchVehicles, type FilterParams } from "@/src/services/vehicles";
import { readUrlState, SearchParams } from "../services/urlParams";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const queryClient = new QueryClient();
  const params = await searchParams;

  // Parse filters from URL
  const { filters, sort, page } = readUrlState(params);

  // Prefetch the initial data on the server with URL params
  await queryClient.prefetchQuery({
    queryKey: ["vehicles", filters, sort, page],
    queryFn: () => fetchVehicles(filters, sort, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehiclesList />
    </HydrationBoundary>
  );
}
