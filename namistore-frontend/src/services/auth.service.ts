import { apiFetch }
from "./api.service";

export async function loginUser(
  email: string,
  password: string
) {
  return apiFetch(
    "/auth/login",
    {
      method: "POST",

      body: JSON.stringify({
        email,
        password
      })
    }
  );
}

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  return apiFetch(
    "/auth/register",
    {
      method: "POST",

      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    }
  );
}