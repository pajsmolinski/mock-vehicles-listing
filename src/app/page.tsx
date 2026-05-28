import { Filters } from "@/src/components/filters";
import { ListHeader } from "@/src/components/ui/listHeader";
import { ListContainer } from "../components/ui/listContainer";
import { ListItem } from "../components/ui/listItem";
import { fetchVehicles } from "../services/vehicles";

export default async function Home() {
  const data = await fetchVehicles();
  const vehicles = await data.result;

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center py-32 px-1 sm:items-start space-y-4">
        <Filters />
        <ListHeader />
        <ListContainer>
          {vehicles.map((vehicle) => (
            <ListItem key={vehicle.id} item={vehicle} />
          ))}
        </ListContainer>
      </main>
    </div>
  );
}
