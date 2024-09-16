import React from "react";
import { Suspense } from "react";
import SearchBar from "@/components/searchbar";
import FinancerList from "@/components/ListFinancers";

export const revalidate = 1; // invalidate every 2 hours

import Filters from "@/components/filter";

let Skeleton: any = null;
const SkeletonPromise = import("@/components/loaders");
SkeletonPromise.then((module) => (Skeleton = module.DisplayCardSkeleton));

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    company_name?: string;
    page?: string;
  };
}) {
  const queryString = new URLSearchParams(searchParams).toString();

  return (
    <div className="flex pt-4 bg-gray-100 min-h-screen ">
      <div className="">
        <Suspense>
          <div className="max-w-5xl">
            <SearchBar />
          </div>
        </Suspense>

        <Suspense key={searchParams?.company_name} fallback={<Skeleton />}>
          <FinancerList queryString={queryString} />
        </Suspense>
      </div>
      <Filters />
    </div>
  );
}
