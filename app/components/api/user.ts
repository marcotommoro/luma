import { baseRequest } from ".";

export const getUserInfo = async () => {
  try {
    const res = await baseRequest("user/get-user-info", "post");
    return res?.data;
  } catch (e) {
    console.log("error", e);
  }
};
