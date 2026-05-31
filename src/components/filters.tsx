"use client";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import type { FilterParams } from "../services/vehicles";

interface FiltersProps {
  onFiltersChange: (filters: FilterParams) => void;
  initialFilters?: FilterParams;
}

export const Filters = ({ onFiltersChange, initialFilters }: FiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.search || "");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [color, setColor] = useState(initialFilters?.color || "All");
  const [fuelType, setFuelType] = useState(initialFilters?.fuel || "All");
  const [vehicleType, setVehicleType] = useState(initialFilters?.type || "All");

  useEffect(() => {
    const filters: FilterParams = {
      search: debouncedSearchQuery || undefined,
      color: color !== "All" ? color : undefined,
      fuel: fuelType !== "All" ? fuelType : undefined,
      type: vehicleType !== "All" ? vehicleType : undefined,
    };
    onFiltersChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, color, fuelType, vehicleType]);

  const handleClearAll = () => {
    setSearchQuery("");
    setColor("All");
    setFuelType("All");
    setVehicleType("All");
  };

  return (
    <div className="flex flex-col border bg-slate-900 border-slate-800 rounded-lg p-2 md:p-4 w-full space-y-4">
      <div className="flex space-x-4">
        <div className="flex flex-1 p-2 rounded-lg bg-slate-950 border-slate-800 border items-center">
          <MagnifyingGlassIcon className="w-6 h-6 inline-block mr-1 text-slate-500" />
          <input
            type="text"
            placeholder="Search by make, model, VIN, type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-white focus:outline-none w-full"
          />
        </div>
        <button
          className="p-2 px-4 rounded-lg bg-slate-700 cursor-pointer flex items-center"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <AdjustmentsHorizontalIcon className="w-4 h-4 inline-block mr-1" />
          <span className="sm:inline hidden">Filters</span>
          {filtersOpen ? (
            <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
          )}
        </button>
        <button
          className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
          onClick={handleClearAll}
        >
          Clear all
        </button>
      </div>
      {filtersOpen && (
        <div className="p-4 rounded-lg bg-slate-950 border-slate-800 border text-white flex sm:flex-row flex-col space-y-0 space-x-0 sm:space-x-4">
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-sm">Color</label>
            <select
              className="p-2 rounded-lg bg-slate-800 border-slate-700 border text-white focus:outline-none"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option>All</option>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-sm">Fuel Type</label>
            <select
              className="p-2 rounded-lg bg-slate-800 border-slate-700 border text-white focus:outline-none"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option>All</option>
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col space-y-2">
            <label className="text-sm">Vehicle Type</label>
            <select
              className="p-2 rounded-lg bg-slate-800 border-slate-700 border text-white focus:outline-none"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option>All</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Hatchback</option>
              <option>Wagon</option>
              <option>Coupe</option>
              <option>Van</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
