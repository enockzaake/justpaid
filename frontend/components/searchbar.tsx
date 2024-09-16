"use client";
import React, { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      return params.toString();
    },
    [searchParams]
  );

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const searchValue = form.get("search");
    if (searchValue) {
      const url =
        "/search" +
        "?" +
        createQueryString("company_name", searchValue.toString());

      router.push(url);
    } else {
      const url = "/search" + "?" + createQueryString("company_name", null);
      router.push(url);
    }
  }

  return (
    <form
      className="flex sm:w-full min-w-6xl mx-3 md:ml-8"
      onSubmit={handleSearch}
    >
      <div className="relative w-full">
        <Input
          className={cn(
            "pl-12 py-6 rounded-3xl text-lg text-black",
            "focus-visible:ring-offset-0",
            "w-full"
          )}
          name="search"
          placeholder="Search finance experts"
        />
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search stroke="currentColor" className="w-6 h-6 text-gray-500" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
