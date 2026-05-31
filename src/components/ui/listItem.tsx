import { Vehicle } from "@/src/services/vehicles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ListItemProps {
  item: Vehicle;
}

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  return (
    <div className="group overflow-hidden border bg-slate-900 border-slate-800 rounded-lg p-2 sm:p-4 transition-all hover:border-slate-500/40">
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-[380px]">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop"
            alt="Jaguar"
            width={380}
            height={240}
            className="h-60 w-full object-cover rounded-lg"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur">
              {item.fuel}
            </span>

            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              {item.type}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-0 sm:p-4 md:p-6 mt-4 md:mt-0">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {item.model}
              </h2>

              <p className="mt-1 text-lg text-slate-400">{item.make}</p>
            </div>

            <Link
              href={`/${item.id}`}
              className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              View details
            </Link>
          </div>

          {/* INFO */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Miles
              </div>

              <div className="mt-2 font-medium text-white">{item.miles}</div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Color
              </div>

              <div className="mt-2 font-medium text-white flex items-center capitalize">
                <span
                  className="w-5 h-5 rounded-full inline-block mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.color}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-white/[0.03] p-4">
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Year
              </div>

              <div className="mt-2 font-medium text-white">{item.year}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
