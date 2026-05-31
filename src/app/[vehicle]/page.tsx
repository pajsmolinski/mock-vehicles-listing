import { ItemHeader } from "@/src/components/ui/itemHeader";
import { fetchVehicleById, fetchVehicles } from "@/src/services/vehicles";
import Image from "next/image";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ItemInfo } from "@/src/components/ui/itemInfo";
import { ItemDetails } from "@/src/components/ui/itemDetails";
import { ListContainer } from "@/src/components/ui/listContainer";
import { ListItem } from "@/src/components/ui/listItem";

interface VehiclePageProps {
  params: Promise<{
    vehicle: string;
  }>;
}

const VehiclePage = async ({ params }: VehiclePageProps) => {
  const { vehicle } = await params;
  const data = await fetchVehicleById(vehicle);

  const similarVehicles = await fetchVehicles(
    {
      color: data.color,
      fuel: data.fuel,
      type: data.type,
    },
    undefined,
    1,
    3,
    "OR",
  );

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center pt-12 md:pt-32 pb-12 px-1 sm:items-start space-y-4">
        <ItemHeader title={data?.model} />
        <div className="flex w-full space-x-0 md:space-x-6 flex-col md:flex-row space-y-4 md:space-y-0">
          <div className="relative lg:w-[380px]">
            <Image
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
              alt="Jaguar"
              width={380}
              height={240}
              className="h-60 w-full object-cover rounded-lg"
              loading="eager"
            />
          </div>
          <ItemInfo vehicle={data} />
        </div>
        <ItemDetails vehicle={data} />

        {similarVehicles?.result && similarVehicles.result.length > 0 && (
          <>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-16">
              Similar vehicles
            </h2>
            <ListContainer>
              {similarVehicles.result.map(
                (vehicle) =>
                  vehicle.id !== data.id && (
                    <ListItem key={vehicle.id} item={vehicle} />
                  ),
              )}
            </ListContainer>
          </>
        )}
      </main>
    </div>
  );
};

export default VehiclePage;
