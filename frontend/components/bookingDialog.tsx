"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Spinner } from "./loaders";

import AppointmentCalendar from "./calendar";

const BookingDialog = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Book
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Book an appointment</AlertDialogTitle>
          <ScrollArea className="md:max-h-[400px]">
            <div className="">Choose available date</div>
            <AppointmentCalendar />
          </ScrollArea>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="min-w-32"
            onClick={() => {
              setLoading(true);
              router.push(`/booking/${id}`);
            }}
          >
            {loading ? <Spinner /> : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingDialog;
