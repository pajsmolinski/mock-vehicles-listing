import { PageContainer } from "@/src/components/ui/pageContainer";
import Link from "next/link";

const NotFoundVehiclePage = () => {
  return (
    <PageContainer>
      <h1 className="text-4xl font-bold tracking-tight text-white">
        Vehicle not found
      </h1>
      <p className="mt-4 text-lg text-slate-400">
        The vehicle you are looking for does not exist or has been removed.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block rounded-lg border border-slate-800 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Back to home
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFoundVehiclePage;
