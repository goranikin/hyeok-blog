import { createGetHandler } from "@/lib/handlerFactory";

export const GET = createGetHandler("/extract-transcript", ["youtube_url"]);
