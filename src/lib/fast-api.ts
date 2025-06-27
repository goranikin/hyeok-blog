import { FASTAPI_URL } from "@/constants/network";
import { objToQueryString } from "./convertParams";

export async function fetchFromFastAPI(
  endpoint: string,
  params: Record<string, string> = {},
) {
  const queryString = objToQueryString(params);

  const response = await _fetch(
    `${FASTAPI_URL}${endpoint}${queryString}`,
    "GET",
  );

  return await response.json();
}

const _fetch = async (url: string, method: string) => {
  const resp = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    console.error(`${method} ${url} failed: ${resp.status}`);
    throw new Error(resp.status.toString());
  }

  return resp;
};
