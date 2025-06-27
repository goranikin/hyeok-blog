import { NextResponse } from "next/server";
import { fetchFromFastAPI } from "./fast-api";

export function createGetHandler(endpoint: string, paramKeys: string[]) {
  return async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const params: Record<string, string> = {};

    for (const key of paramKeys) {
      params[key] = searchParams.get(key) ?? "";
    }

    try {
      const data = await fetchFromFastAPI(endpoint, params);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ error: "Next.js 서버 에러" }, { status: 500 });
    }
  };
}
