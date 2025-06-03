import { createGetHandler } from "@/lib/handlerFactory";

export const GET = createGetHandler("/restaurant-recommend", [
	"country",
	"city",
	"food",
	"max_items",
]);
