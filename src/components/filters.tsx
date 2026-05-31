"use client";
import {
  AdjustmentsHorizontalIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { memo, useState } from "react";
import type { FilterParams } from "../services/vehicles";
import { FILTERS } from "../config";

const FilterSelect = memo(function FilterSelect({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col space-y-2">
      <label htmlFor={`${label}-filter`} className="text-sm">
        {label}
      </label>
      <select
        id={`${label}-filter`}
        className="p-2 rounded-lg bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700 border text-slate-900 dark:text-white focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="All">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

interface FiltersProps {
  onFiltersChange: (filters: FilterParams) => void;
  filters: FilterParams;
  search: string;
  onSearchChange: (search: string) => void;
}

export const Filters = ({
  onFiltersChange,
  filters,
  search,
  onSearchChange,
}: FiltersProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateFilter = (key: keyof FilterParams, value: string) => {
    const newFilters: FilterParams = {
      ...filters,
      [key]: value !== "All" ? value : undefined,
    };
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    onFiltersChange({
      color: null,
      fuel: null,
      type: null,
    });
    onSearchChange("");
  };

  const isAnyFilterActive =
    search.trim() !== "" ||
    (filters.color && filters.color !== "All") ||
    (filters.fuel && filters.fuel !== "All") ||
    (filters.type && filters.type !== "All");

  return (
    <div className="flex flex-col border bg-slate-200 border-slate-300 dark:bg-slate-900 dark:border-slate-800 rounded-lg p-2 md:p-4 w-full space-y-4">
      <div className="flex space-x-4">
        <div className="flex flex-1 p-2 rounded-lg bg-slate-100 border-slate-300 dark:bg-slate-950 dark:border-slate-800 border items-center">
          <MagnifyingGlassIcon className="w-6 h-6 inline-block mr-1 text-slate-500" />
          <input
            type="text"
            placeholder="Search by make, model, VIN, type..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 text-slate-900 dark:text-white focus:outline-none w-full"
          />
        </div>
        <button
          className="p-2 px-4 rounded-lg bg-slate-300 dark:bg-slate-700 cursor-pointer flex items-center"
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
        {isAnyFilterActive && (
          <button
            className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
            onClick={handleClearAll}
          >
            <span className="sm:inline hidden">Clear all</span>
            <XMarkIcon className="w-4 h-4 inline-block sm:hidden"></XMarkIcon>
          </button>
        )}
      </div>
      {filtersOpen && (
        <div className="p-4 rounded-lg bg-slate-100 border-slate-300 dark:bg-slate-950 dark:border-slate-800 border text-slate-900 dark:text-white flex sm:flex-row flex-col space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
          <FilterSelect
            label="Color"
            options={FILTERS.COLORS}
            value={filters.color || "All"}
            onChange={(value) => updateFilter("color", value)}
          />
          <FilterSelect
            label="Fuel Type"
            options={FILTERS.FUELS}
            value={filters.fuel || "All"}
            onChange={(value) => updateFilter("fuel", value)}
          />
          <FilterSelect
            label="Vehicle Type"
            options={FILTERS.TYPES}
            value={filters.type || "All"}
            onChange={(value) => updateFilter("type", value)}
          />
        </div>
      )}
    </div>
  );
};
