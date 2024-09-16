"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    const form = new FormData(e.target as HTMLFormElement);

    const searchValue = form.get("search");
    if (searchValue) {
      params.set("query", searchValue.toString());
    } else {
      params.delete("query");
    }
    if (pathname === "/") {
      router.push(`search/?${params.toString()}`);
    } else {
      router.replace(`${pathname}?${params.toString()}`);
    }
  }
  return (
    <div>
      <form>Filters</form>
    </div>
  );
}
