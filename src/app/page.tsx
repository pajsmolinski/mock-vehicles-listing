import { Filters } from "@/src/components/filters";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-1 sm:items-start">
        <Filters />
      </main>
    </div>
  );
}
