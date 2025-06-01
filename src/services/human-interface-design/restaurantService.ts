import type {
	RestaurantItem,
	SearchFoodList,
	FoodItem,
	SearchRestaurantList,
} from "@/services/human-interface-design/types";
import { getRequest } from "@/services";

export const getFoodList = async (
	searchFoodList: SearchFoodList,
): Promise<FoodItem[]> => {
	return getRequest("/api/food-recommend", {
		country: searchFoodList.country,
		city: searchFoodList.city,
		max_items: 10,
	}) as Promise<FoodItem[]>;
};

export const getRestaurantList = async (
	searchRestaurantList: SearchRestaurantList,
): Promise<RestaurantItem[]> => {
	return getRequest("/api/search-restaurant", {
		country: searchRestaurantList.country,
		city: searchRestaurantList.city,
		food: searchRestaurantList.name,
		max_results: "10",
	});
};
