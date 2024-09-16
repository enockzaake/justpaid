"use client";
import React, { useState } from "react";
import { format, isWeekend } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type CustomDateTimePickerProps = {
  weekdayTimes?: string[];
  weekendTimes?: string[];
  onDateTimeChange?: (date: any, time: any) => void;
};

const AppointmentCalendar: React.FC<CustomDateTimePickerProps> = ({
  weekdayTimes = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ],
  weekendTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"],
  onDateTimeChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Get the time slots based on the day type (weekend or weekday)
  const getTimeSlots = (date: Date | undefined): string[] => {
    if (!date) return [];
    return isWeekend(date) ? weekendTimes : weekdayTimes;
  };

  const timeSlots = getTimeSlots(selectedDate);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || undefined);
    setSelectedTime(""); // Reset time when a new date is selected
    onDateTimeChange?.(date, "");
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onDateTimeChange?.(selectedDate, time);
  };

  // Format selected date and time for display
  const formattedDate = selectedDate
    ? format(selectedDate, "PPP")
    : "No date selected";
  const formattedTime = selectedTime || "No time selected";

  return (
    <div className="flex bg-blue-100 gap-8">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
      />

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Available Times</h3>
        {selectedDate && (
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.length > 0 ? (
              timeSlots.map((time) => (
                <div
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`px-4 py-2 border rounded hover:cursor-pointer ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {time}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No available times for this day.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
