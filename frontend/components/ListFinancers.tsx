import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getProviders } from "@/actions/client";

import DisplayCard from "./displayCard";
import { ProviderType } from "@/types";

async function FinancerList({ queryString }: { queryString: string }) {
  const { data, error } = await getProviders(queryString);

  if (error) {
    return <div className="">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-2 sm:mx-8 p-2">
      {data.map((provider: ProviderType, index: number) => (
        <DisplayCard key={index} provider={provider} />
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default FinancerList;
