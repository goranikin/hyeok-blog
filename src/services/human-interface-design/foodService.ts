import type {
	FoodItem,
	SearchFoodList,
} from "@/services/human-interface-design/types";
import { getRequest } from "@/services";

export const getFoodList = async (
	search: SearchFoodList,
): Promise<FoodItem[]> => {
	return getRequest("/api/food-recommend", {
		country: search.country,
		city: search.city,
		max_items: 10,
	});
};
