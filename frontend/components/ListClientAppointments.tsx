import React from "react";
import AppointmentDetails from "./appointmentDetails";

function ListClientAppointments({ appointments }: any) {
  return (
    <section className="text-gray-400 body-font">
      <div className="mx-auto">
        <div className="flex flex-wrap w-full">
          {appointments ? (
            appointments.map((appointment: any, index: number) => (
              <div key={index} className="sm:w-1/2 md:w-1/4 px-2">
                <div className="border border-gray-300 shadow-md rounded-sm overflow-hidden">
                  <div
                    className={`p-4 ${
                      appointment.status === "pending"
                        ? "bg-gray-100"
                        : appointment.status === "cancelled"
                        ? "bg-red-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Date: </span>{" "}
                      {appointment.date}
                    </p>
                    <p className="text-gray-600 mt-1">
                      <span className="font-medium">Time: </span>{" "}
                      {(appointment.time as string).slice(0, 5)}
                    </p>
                    {/* <Button>View</Button> */}
                    <AppointmentDetails appointment={appointment} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="sm:w-1/2 md:w-1/4 p-1">No appointments yet</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ListClientAppointments;
