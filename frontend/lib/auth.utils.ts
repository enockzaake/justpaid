"server only";
import { ManagementClient } from "auth0";

var management = new ManagementClient({
  domain: process.env.AUTH0_ISSUER_BASE_URL!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

export async function allUsers() {
  try {
    const users = await management.users.getAll();
    console.log("ALL USERS:", users);
  } catch (error: any) {
    console.log("ERROR GETTING AUTO 0 USERS:", error.message);
  }
}
