"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { Logout } from "@/actions/auth";

import { ChevronDown, UserRound } from "lucide-react";
import { useUser } from "@/context/UserContext";

import eventBus from "@/lib/events";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const { user, loading } = useUser();

  return (
    <header className="bg-blue-100 md:pt-3 md:px-8">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href="/">
              <Image
                src="/logo-color-transparent.png"
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {user && (
                  <li>
                    <Link
                      className="transition hover:text-teal-600 text-gray-900"
                      href={`${
                        user.type === "company"
                          ? "/provider/dashboard"
                          : "/dashboard"
                      }`}
                    >
                      {user.type === "company"
                        ? "Provider dashboard"
                        : "Dashboard"}
                    </Link>
                  </li>
                )}
                {!user && !loading && (
                  <li>
                    <Link
                      className="transition hover:text-teal-600 text-gray-900"
                      href="/provider/login"
                    >
                      Service Provider
                    </Link>
                  </li>
                )}

                {user && (
                  <li>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <UserRound />
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup>
                          <Link
                            href="/account"
                            className="hover:cursor-pointer"
                          >
                            <DropdownMenuRadioItem
                              value="settings"
                              className="hover:cursor-pointer"
                            >
                              Account
                            </DropdownMenuRadioItem>
                          </Link>

                          <DropdownMenuRadioItem
                            onClick={async () => {
                              await Logout();
                              eventBus.emit("sessionUpdated");
                              router.push("/");
                            }}
                            value="logout"
                            className="hover:cursor-pointer"
                          >
                            Logout
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!user && !loading && (
                  <>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-50 px-5 py-2.5 text-sm font-medium text-teal-600 shadow"
                        href="/login"
                      >
                        Login
                      </Link>
                    </div>
                    <div className="hidden sm:flex">
                      <Link
                        className="rounded-md bg-gray-50 px-5 py-2.5 text-sm font-medium text-teal-600 shadow"
                        href="/sign-up"
                      >
                        Sign up
                      </Link>
                    </div>
                  </>
                )}
              </div>

              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger className="rounded bg-gray-50 p-2 text-gray-900 transition hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </SheetTrigger>
                  <SheetContent side={"left"}>
                    <SheetHeader>
                      <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
