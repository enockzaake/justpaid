import { getSession } from "./auth";

export function withAuthActionRequired(action: any) {
  return async function (...args: any[]) {
    const { data, access, error } = await getSession();

    if (error) {
      return { data: null, error: "Please login to continue" };
    }
    return action({ ...args, access });
  };
}
