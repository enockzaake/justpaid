"use server";
var jwt = require("jsonwebtoken");

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function providerProfile(id: string) {}

export async function providerAppointments() {
  const user = "provider-id";
  // const { idToken } = JSON.parse(JSON.stringify(user));
  // const { sub } = jwt.decode(idToken);
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/provider-appointments/${1}`);
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function getAppointmentDetails(
  appointment_id: string
): Promise<{ data: any[] | null; error: any }> {
  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/appointment/${appointment_id}`
    );
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}
