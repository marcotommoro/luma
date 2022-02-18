import axios from "axios";
import { auth } from "../auth/firebase.config";
export const test = async () => {
  try {
    console.log("frocio");
    const t = await auth.currentUser?.getIdToken();
    const { data } = await axios.post(
      "http://localhost:8080/user/fetch-value/",
      {
        tokenId: t,
      }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const baseRequest = async (
  url: string,
  method: string = "get",
  data: object = {}
) => {
  if (!auth.currentUser) return;

  const tokenId: string = await auth.currentUser.getIdToken();

  const o = axios({
    method: method === "post" ? "post" : "get",
    url: `http://localhost:8080/${url}`,
    data: data,
    headers: {
      Authorization: tokenId,
    },
  });
  return o;
};
