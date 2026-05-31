import { Vehicle } from "@/src/services/vehicles";
import { memo } from "react";
import { ColorIcon } from "./colorIcon";

interface ItemDetailsProps {
  vehicle: Vehicle;
}

const ItemDetailsItem: React.FC<{
  label: string;
  value: string | number | undefined;
  icon?: React.ReactNode;
}> = memo(function ItemDetailsItem({ label, value, icon }) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium text-slate-400">{label}</div>
      <div className="text-lg font-semibold text-slate-950 dark:text-slate-200 flex items-center">
        {icon}
        {value}
      </div>
    </div>
  );
});

export const ItemDetails: React.FC<ItemDetailsProps> = ({ vehicle }) => {
  return (
    <div className="justify-between flex flex-col md:flex-row border bg-slate-200 border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-lg p-4 space-y-4 w-full">
      <ItemDetailsItem
        label="Color"
        value={vehicle.color}
        icon={<ColorIcon color={vehicle.color || "transparent"} />}
      />
      <ItemDetailsItem label="Fuel" value={vehicle.fuel} />
      <ItemDetailsItem label="Type" value={vehicle.type} />
      <ItemDetailsItem label="Year" value={vehicle.year} />
      <ItemDetailsItem label="Miles" value={`${vehicle.miles} miles`} />
    </div>
  );
};
