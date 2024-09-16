"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { makeAppointment, getBookedDatesAndTime } from "@/actions/client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/loaders";

import { useEffect, useState } from "react";

import AppointmentCalendar from "@/components/calendar";

export default function BookingFormPage({ params }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const router = useRouter();

  function onDateTimeChange(date: any, time: any) {
    setDate(date);
    setTime(time);
  }

  useEffect(() => {
    async function getDates() {
      await getBookedDatesAndTime(params.id);
    }
    getDates();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    if (!date || !time) {
      toast.error("Both date and time are required");
      setLoading(false);
      return;
    }

    const form = new FormData(e.target as HTMLFormElement);
    form.set("provider_id", params.id);
    form.set("date", date.toISOString().slice(0, 10));
    form.set("time", time);

    const { data, error } = await makeAppointment(form);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("Appointment created successfully");
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-12">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="relative flex-col items-start gap-8 md:flex">
            <form
              className="grid mx-2 md:w-1/2 md:mx-auto items-start gap-6"
              onSubmit={handleSubmit}
            >
              <span className="md:text-2xl font-semibold">
                Make appointment
              </span>
              <span className="text-sm -mt-6">
                Fill more information to help the expert better handle and
                understand your requirements.
              </span>
              <AppointmentCalendar onDateTimeChange={onDateTimeChange} />

              <fieldset className="grid gap-6">
                <div className="grid">
                  <Label
                    htmlFor="content"
                    className="text-gray-900 font-semibold text-md"
                  >
                    Description
                  </Label>
                  <Textarea
                    required
                    name="description"
                    id="content"
                    placeholder="Hello..."
                    className="bg-gray-100/30 border  border-gray-600 text-gray-900 min-h-[16rem] focus-visible:ring-offset-0 rounded-sm"
                  />
                </div>
              </fieldset>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                {loading ? <Spinner /> : "Book appointment"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
