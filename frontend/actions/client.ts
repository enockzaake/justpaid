"use server";

import { revalidateTag } from "next/cache";
import { withAuthActionRequired } from "./shared.server";

const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;

export async function getProviders(queryString?: string) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/providers/?${queryString}`);
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function providerDetails(id: number) {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/provider/${id}`);
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function makeAppointment(form: FormData) {
  // const user = await getSession();
  const user = "auth-user";

  const provider_id = form.get("provider_id");
  const date = form.get("date");
  const time = form.get("time");
  const description = form.get("description");

  try {
    if (user) {
      // const { idToken } = JSON.parse(JSON.stringify(user));
      // const { sub } = jwt.decode(idToken);

      const res = await fetch(`${BACKEND_BASE_URL}/appointments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_auth0_id: "auth0|66d30e3afce788171f794cd9",
          provider: provider_id,
          date: date,
          time: time,
          description: description,
          appointment_link:
            "https://findr-app.com/user-1/provoder-2/appointment_link",
        }),
      });

      const data = await res.text();
      console.log("RES DATA:", data);
      if (res.status != 201) {
        return { data: null, error: "Error creating appointment" };
      }
      revalidateTag("client-appointments");
      return { data: data, error: null };
    } else {
      return { data: null, error: "Please login to make an appointment" };
    }
  } catch (error: any) {
    console.log("ERROR MAKING APPOINTMENT:", error.message);
    return { data: null, error: error.message };
  }
}

export async function getBookedDatesAndTime(provider_id: string | number) {
  try {
    const res = await fetch(
      `${BACKEND_BASE_URL}/provider/${provider_id}/booked-dates`
    );
    if (res.status == 200) {
      const data = await res.json();
      console.log("DATES:", data);
      return { data: data, error: null };
    } else {
      return { data: null, error: "Failed to fetched available dates" };
    }
  } catch (error: any) {
    console.log("Error:", error.message);
    return { data: null, error: error.message };
  }
}

export const clientAppointments = withAuthActionRequired(async function ({
  access,
}: {
  access: string;
}) {
  const user = "auth0|66d30e3afce788171f794cd9";

  try {
    const res = await fetch(`${BACKEND_BASE_URL}/client-appointments/${user}`, {
      next: { tags: ["client-appointments"] },
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await res.json();
    return { data: data, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
});

export async function clientAccountDetails(id: string) {}

export async function newUser(form: FormData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append(
    "Authorization",
    `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`
  );
  console.log("USER TYPE:", form.get("user_type") as string);

  var raw = JSON.stringify({
    email: form.get("email") as string,
    user_metadata: {
      findr_user_type: form.get("user_type") as string,
    },
    blocked: false,
    email_verified: false,
    given_name: form.get("first_name") as string,
    family_name: form.get("last_name") as string,
    name: form.get("first_name") as string,
    nickname: form.get("first_name") as string,
    picture:
      "https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80",

    connection: "Username-Password-Authentication",
    password: form.get("password") as string,
    verify_email: false,
  });

  var requestOptions: Record<string, any> = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const res = await fetch(
      "https://dev-mvtoxwwymuoytmnp.us.auth0.com/api/v2/users",
      requestOptions
    );

    console.log("STATUS:", res.status);
    if (res.status === 201) {
      const data = await res.json();
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/sign-up-callback/`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      console.log("DJANGO USER:", JSON.stringify(await res2.json(), null, 2));
      return { data: "User registration successful", error: null };
    } else {
      return { data: null, error: await res.json() };
    }
  } catch (error: any) {
    console.log("ERROR:", error.message);
    return { data: null, error: error.message };
  }
}

export const protectedAction = withAuthActionRequired(async function ({
  name,
  access,
}: {
  name?: string;
  access: string;
}) {
  console.log("This is a protected action with access token as:", access);
  return { data: "This is a protected action", error: null };
});
