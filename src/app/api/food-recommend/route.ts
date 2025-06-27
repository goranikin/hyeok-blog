import { createGetHandler } from "@/lib/handlerFactory";

export const GET = createGetHandler("/food-recommend", [
  "country",
  "city",
  "max_items",
]);
