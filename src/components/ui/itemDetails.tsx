import { Vehicle } from "@/src/services/vehicles";

interface ItemDetailsProps {
  vehicle: Vehicle;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({ vehicle }) => {
  return (
    <div className="justify-between flex flex-col md:flex-row border bg-slate-900 border-slate-800 rounded-lg p-4 space-y-4 w-full">
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-400">Color</div>
        <div className="text-lg font-semibold text-slate-200">
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: vehicle.color.toLowerCase() }}
          ></span>
          {vehicle.color}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-400">Fuel</div>
        <div className="text-lg font-semibold text-slate-200">
          {vehicle.fuel}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-400">Type</div>
        <div className="text-lg font-semibold text-slate-200">
          {vehicle.type}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-400">Year</div>
        <div className="text-lg font-semibold text-slate-200">
          {vehicle.year}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-medium text-slate-400">Miles</div>
        <div className="text-lg font-semibold text-slate-200">
          {vehicle.miles} miles
        </div>
      </div>
    </div>
  );
};
