import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

interface ItemHeaderProps {
  title?: string;
}

export const ItemHeader: React.FC<ItemHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center w-full space-x-4">
      <Link
        href={"/"}
        className="rounded-xl border border-slate-800 bg-slate-950 pl-3 pr-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        <ChevronLeftIcon className="w-5 h-5 inline-block mr-2" />
        Back
      </Link>

      <h1 className="text-4xl font-bold tracking-tight text-white">
        {title || "Vehicle details"}
      </h1>
    </div>
  );
};
