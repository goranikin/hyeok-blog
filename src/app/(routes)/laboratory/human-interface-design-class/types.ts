export type FoodItem = {
	name: string;
	local_name: string;
	english_name: string;
	description: string;
};

export type RestaurantItem = {
	name: string;
	address: string;
	rating: number;
	user_rating_count: number;
	price_level: string;
};

export type SearchFoodList = {
	country: string;
	city: string;
};
