import { ItemHeader } from "@/src/components/ui/itemHeader";
import { fetchVehicleById, fetchVehicles } from "@/src/services/vehicles";
import { ItemInfo } from "@/src/components/ui/itemInfo";
import { ItemDetails } from "@/src/components/ui/itemDetails";
import { ListContainer } from "@/src/components/ui/listContainer";
import { ListItem } from "@/src/components/ui/listItem";
import { PAGINATION } from "@/src/config";
import { PageContainer } from "@/src/components/ui/pageContainer";
import { Thumbnail } from "@/src/components/ui/thumbnail";
import { notFound } from "next/navigation";

interface VehiclePageProps {
  params: Promise<{
    vehicle: string;
  }>;
}

const VehiclePage = async ({ params }: VehiclePageProps) => {
  const { vehicle } = await params;

  const data = await fetchVehicleById(vehicle);

  const { result } = data;

  if (!result || result.length === 0) {
    notFound();
  }

  const similarVehicles = await fetchVehicles(
    {
      color: result[0].color,
      fuel: result[0].fuel,
      type: result[0].type,
    },
    undefined,
    1,
    PAGINATION.SIMILAR_VEHICLES_COUNT,
    "OR",
  );

  return (
    <PageContainer>
      <ItemHeader title={result[0].model} />
      <div className="flex w-full space-x-0 md:space-x-6 flex-col md:flex-row space-y-4 md:space-y-0">
        <div className="relative lg:w-[380px]">
          <Thumbnail type={result[0].type} />
        </div>
        <ItemInfo vehicle={result[0]} />
      </div>
      <ItemDetails vehicle={result[0]} />

      {similarVehicles?.result && similarVehicles.result.length > 0 && (
        <>
          <h2 className="text-2xl font-bold tracking-tight text-white mt-16">
            Similar vehicles
          </h2>
          <ListContainer>
            {similarVehicles.result.map(
              (vehicle) =>
                vehicle.id !== result[0].id && (
                  <ListItem key={vehicle.id} item={vehicle} />
                ),
            )}
          </ListContainer>
        </>
      )}
    </PageContainer>
  );
};

export default VehiclePage;
