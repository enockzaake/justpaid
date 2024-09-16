import React from "react";
import { getAppointmentDetails } from "@/actions/providers";
import { PageParams } from "@/types";

const AppointmentDetails = async ({ params }: PageParams) => {
  const appointment_details = await getAppointmentDetails(params.id);
  return (
    <div>
      AppointmentDetails
      <pre>{JSON.stringify(appointment_details, null, 2)}</pre>
    </div>
  );
};

export default AppointmentDetails;
