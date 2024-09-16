"use server";

import { cookies } from "next/headers";

const BACKEND_URL: string = process.env.BACKEND_BASE_URL!;

export async function Signup(form: FormData) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/registration/`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password1: password,
        password2: password,
      }),
    });

    const data = await res.json();
    console.log("DATA:", data);
    if (!data.access) {
      return { data: null, error: data };
    }
    cookies().set("findr-access-token", data.access);
    cookies().set("findr-refresh-token", data.refresh);
    return { data: true, error: null };
  } catch (error: any) {
    console.log("SIGN UP ERROR:", error.message);
    cookies().set("findr-access-token", "");
    cookies().set("findr-refresh-token", "");

    return { data: null, error: error.message };
  }
}

export async function Login(form: FormData) {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/login/`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      cookies().set("findr-access-token", data.access);
      cookies().set("findr-refresh-token", data.refresh);
      return { data: data, error: null };
    }

    return { data: null, error: "Invalid login credentials" };
  } catch (error: any) {
    console.log("LOGIN ERROR:", error.message);
    return { data: null, error: error.message };
  }
}

export async function Logout() {
  const { access } = await getTokens();
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/logout/`, {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      cookies().delete("findr-access-token");
      cookies().delete("findr-refresh-token");
      return { data: data, error: null };
    }
  } catch (error: any) {
    console.log("LOGOUT ERROR:", error.message);
    cookies().delete("findr-access-token");
    cookies().delete("findr-refresh-token");

    return { data: null, error: error.message };
  }
}

export async function getTokens() {
  const access = cookies().get("findr-access-token");
  const refresh = cookies().get("findr-refresh-token");
  // Check if expired or about to expire then refresh
  return { access: access?.value, refresh: refresh?.value };
}
export async function refreshToken() {}

export async function getSession() {
  const { access, refresh } = await getTokens();
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/user/`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      return { data: data, access: access, error: null };
    }
    return { data: null, error: "Error getting user session." };
  } catch (error: any) {
    console.log("ERROR GETTING USER:", error.message);
    return { data: null, error: error.message };
  }
}
