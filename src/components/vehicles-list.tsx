"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Filters } from "@/src/components/filters";
import { ListHeader } from "@/src/components/ui/listHeader";
import { ListContainer } from "@/src/components/ui/listContainer";
import { ListItem } from "@/src/components/ui/listItem";
import { fetchVehicles, type FilterParams } from "@/src/services/vehicles";

export function VehiclesList() {
  const [filters, setFilters] = useState<FilterParams>({});
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["vehicles", filters, page],
    queryFn: () => fetchVehicles(filters, page),
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center py-32 px-1 sm:items-start space-y-4">
        <Filters onFiltersChange={setFilters} />
        <ListHeader />

        {isError && (
          <div className="flex items-center justify-center w-full py-8">
            <div className="text-red-400">
              Error loading vehicles:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </div>
          </div>
        )}

        {data && (
          <>
            {isFetching && !isLoading && (
              <div className="w-full text-center text-slate-400 text-sm">
                Updating...
              </div>
            )}
            <ListContainer>
              {data.result.map((vehicle) => (
                <ListItem key={vehicle.id} item={vehicle} />
              ))}
            </ListContainer>

            {data.meta.totalPages > 1 && (
              <div className="flex gap-2 items-center justify-center w-full">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-500"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {page} of {data.meta.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.meta.totalPages, p + 1))
                  }
                  disabled={page === data.meta.totalPages}
                  className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:bg-slate-800 disabled:text-slate-500"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
