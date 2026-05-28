import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";

interface ListHeaderProps {
  total: number;
  sortBy?: string;
  onSortChange: (sortBy: string | undefined) => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  total,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex items-center justify-between mb-4 w-full">
      <div>
        <span className="text-blue-500 font-semibold">{total}</span> vehicles
        found
      </div>
      <div className="flex items-center space-x-4">
        <div>Sort by</div>
        <div className="p-2 rounded-lg bg-slate-800 border-slate-700 border text-white grid shrink-0 grid-cols-1 focus-within:relative">
          <select
            className="bg-slate-800 col-start-1 row-start-1 focus:outline-none appearance-none pr-7"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value={""}>Recommended</option>
            <option value="year_DESC">Year (newest)</option>
            <option value="year_ASC">Year (oldest)</option>
            <option value="miles_DESC">Miles (highest)</option>
            <option value="miles_ASC">Miles (lowest)</option>
            <option value="make_ASC">Make (A-Z)</option>
            <option value="make_DESC">Make (Z-A)</option>
          </select>
          <ArrowsUpDownIcon className="w-4 h-4 col-start-1 row-start-1 pointer-events-none justify-self-end self-center text-slate-400" />
        </div>
      </div>
    </div>
  );
};
