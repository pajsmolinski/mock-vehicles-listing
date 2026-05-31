import { Vehicle } from "@/src/services/vehicles";
import { memo } from "react";

interface ItemInfoProps {
  vehicle: Vehicle;
}

const ItemInfoItem: React.FC<{
  label: string;
  value: string | number | undefined;
}> = memo(function ItemInfoItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="text-lg font-semibold text-slate-950 dark:text-slate-200">
        {value}
      </div>
    </div>
  );
});

export const ItemInfo: React.FC<ItemInfoProps> = ({ vehicle }) => {
  return (
    <div className="flex-1 flex flex-col border bg-slate-200 border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-lg p-4 space-y-4">
      <ItemInfoItem label="ID" value={vehicle.id} />
      <ItemInfoItem label="VIN" value={vehicle.vin} />
      <ItemInfoItem label="Manufacturer" value={vehicle.make} />
      <ItemInfoItem label="Model" value={vehicle.model} />
    </div>
  );
};
