import { useState } from "react";
import type { FoodItem, SearchFoodList } from "../types";

export function useFoodRecommend() {
	const [pending, setPending] = useState(false);
	const [foodList, setFoodList] = useState<FoodItem[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function fetchFoodRecommend(data: SearchFoodList) {
		setPending(true);
		setError(null);
		try {
			const res = await fetch(
				`/api/food-recommend?country=${encodeURIComponent(data.country)}&city=${encodeURIComponent(data.city)}&max_items=10`,
			);
			if (!res.ok) throw new Error("추천 실패");
			const result = await res.json();
			setFoodList(result);
		} catch {
			setError("food-recommend fetch error");
			setFoodList(null);
		}
		setPending(false);
	}

	return { foodList, pending, error, fetchFoodRecommend };
}
