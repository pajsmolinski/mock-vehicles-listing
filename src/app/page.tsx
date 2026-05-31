import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { VehiclesList } from "@/src/components/vehicles-list";
import { fetchVehicles } from "@/src/services/vehicles";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    color?: string;
    fuel?: string;
    type?: string;
    sort?: string;
    page?: string;
  }>;
}

const paramsLoader = createLoader({
  color: parseAsString,
  fuel: parseAsString,
  type: parseAsString,
  search: parseAsString,
  sort: parseAsString,
  page: parseAsInteger,
});

export default async function Home({ searchParams }: HomeProps) {
  const queryClient = new QueryClient();

  const { color, fuel, type, search, sort, page } =
    await paramsLoader(searchParams);

  // Prefetch the initial data on the server with URL params
  await queryClient.prefetchQuery({
    queryKey: ["vehicles", search, { color, fuel, type }, sort, page],
    queryFn: () =>
      fetchVehicles(search || "", { color, fuel, type }, sort || "", page || 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehiclesList />
    </HydrationBoundary>
  );
}
