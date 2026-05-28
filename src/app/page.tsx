import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { VehiclesList } from "@/src/components/vehicles-list";
import { fetchVehicles } from "@/src/services/vehicles";

export default async function Home() {
  const queryClient = new QueryClient();

  // Prefetch the initial data on the server
  await queryClient.prefetchQuery({
    queryKey: ["vehicles", {}, undefined, 1],
    queryFn: () => fetchVehicles({}, undefined, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehiclesList />
    </HydrationBoundary>
  );
}
