import { baseRequest } from ".";

export const registerUserRole = async (role: string) => {
  console.log("ROLE", role);
  const res = await baseRequest("user/register-role", "post", { role });

  console.log("Response: ", res?.data);
};
