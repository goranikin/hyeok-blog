import { useState } from "react";
import type { RestaurantItem } from "../types";

interface Params {
	country: string;
	city: string;
	food: string;
	max_results?: string;
}

export function useRestaurantSearch() {
	const [restaurantList, setRestaurantList] = useState<RestaurantItem[] | null>(
		null,
	);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchRestaurants(params: Params) {
		setPending(true);
		setError(null);
		setRestaurantList(null);
		try {
			const urlParams = new URLSearchParams({
				country: params.country,
				city: params.city,
				food: params.food,
				max_results: params.max_results ?? "10",
			});
			const res = await fetch(
				`/api/restaurant-recommend?${urlParams.toString()}`,
			);
			if (!res.ok) throw new Error("음식점 검색 실패");
			const result = await res.json();
			setRestaurantList(result);
		} catch {
			setError("restaurant-recommend fetch error");
			setRestaurantList([]);
		}
		setPending(false);
	}

	return { restaurantList, pending, error, fetchRestaurants };
}
