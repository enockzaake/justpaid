import Link from "next/link";
import React from "react";
import { DisplayCardProps } from "@/types";
import Image from "next/image";
export default function DisplayCard({ provider }: DisplayCardProps) {
  return (
    <article className="rounded-sm bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <Link
        href={`/provider-details/${provider.id}`}
        className="flex items-start sm:gap-8"
      >
        <div
          className="sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2"
          aria-hidden="true"
        >
          {provider.cover_image ? (
            <Image
              width={200}
              height={200}
              src={provider.cover_image}
              alt={`${provider.company_name} cover`}
              className="sm:rounded-full sm:object-cover sm:w-20 sm:h-20"
            />
          ) : (
            <div className="flex items-center gap-1">
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
              <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
            </div>
          )}
        </div>

        <div suppressContentEditableWarning={true}>
          <h3 className="mt-4 text-lg font-medium sm:text-xl">
            <Link
              href={`/provider-details/${provider.id}`}
              className="hover:underline"
            >
              {provider.company_name}
            </Link>
          </h3>

          <strong className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white">
            {provider.type === "individual" ? "Individual" : "Company"}
          </strong>

          <p className="mt-1 text-sm text-gray-700">{provider.description}</p>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-1 text-gray-500">
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <p className="text-xs font-medium">
                Location: {provider.location}
              </p>
            </div>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Category: {provider.category}
            </p>
          </div>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <p className="text-xs font-medium text-gray-500">
              Phone: {provider.phone_numbers}
            </p>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Rating: {provider.rating}
            </p>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Service Fee: {provider.service_fee}{" "}
              {provider.non_fixed_fee && "(Non-Fixed)"}
            </p>
          </div>

          <div className="mt-4 sm:flex sm:items-center sm:gap-2">
            <p className="text-xs font-medium text-gray-500">
              Speciality: {provider.speciality}
            </p>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
              Website:{" "}
              <a
                href={provider.website}
                className="underline hover:text-gray-700"
              >
                {provider.website}
              </a>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
