import { createGetHandler } from "@/lib/handlerFactory";

export const GET = createGetHandler("/youtube-info", ["youtube_url"]);
