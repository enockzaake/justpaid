import React from "react";
import { clientAppointments } from "@/actions/client";
import ListClientAppointments from "@/components/ListClientAppointments";

const ClientDashboard = async () => {
  const { data, error } = await clientAppointments();

  return (
    <div className="flex flex-col">
      <div className="container w-full">
        <span className="text-2xl mx-2">CLIENT DASHBOARD</span>
        <ListClientAppointments appointments={data.appointments} />
      </div>
    </div>
  );
};

export default ClientDashboard;
