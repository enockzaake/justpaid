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
import { Copy } from "lucide-react";
import { toast } from "sonner";

const AppointmentDetails = ({ appointment }: any) => {
  const router = useRouter();

  async function cancelAppointment() {
    toast.info("Appointment cancelled");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg">
        View
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Appointment details</AlertDialogTitle>
          <ScrollArea className="md:max-h-[400px]"></ScrollArea>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              {/* Provider Photo */}
              <img
                src={appointment.provider.owner.profile_photo}
                alt={
                  appointment.provider.owner.first_name +
                  " " +
                  appointment.provider.owner.last_name
                }
                className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-800"
              />
              <div className="flex flex-col items-center text-center justify-center mt-4">
                <h2 className="font-medium title-font text-white text-lg">
                  {appointment.provider.owner.first_name}{" "}
                  {appointment.provider.owner.last_name}
                </h2>
                <div className="w-36 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base text-gray-400">
                  {appointment.provider.company_name}
                </p>
                <p className="text-sm text-gray-500">
                  {appointment.provider.location}
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <p className="leading-relaxed text-lg mb-4">
                <span className="font-medium">Date:</span>{" "}
                {new Date(appointment.date).toLocaleDateString()}
                <br />
                <span className="font-medium">Time:</span>{" "}
                {new Date(appointment.time).toLocaleTimeString()}
                <br />
                <span className="font-medium">Status:</span>{" "}
                {appointment.status}
                <br />
                <span className="font-medium">Description:</span>{" "}
                {appointment.description}
              </p>
              <div className="flex items-center mt-4">
                <a
                  href={appointment.appointment_link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Appointment
                </a>
              </div>
            </div>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter className="flex justify-between">
          <Button
            onClick={cancelAppointment}
            className="bg-red-500 hover:bg-red-600"
          >
            Cancel appointment
          </Button>

          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppointmentDetails;
