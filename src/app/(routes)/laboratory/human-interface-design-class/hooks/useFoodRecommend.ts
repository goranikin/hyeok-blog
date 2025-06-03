import { useState } from "react";
import type { FoodItem } from "../types";

interface Params {
	country: string;
	city: string;
}

export function useFoodRecommend() {
	const [pending, setPending] = useState(false);
	const [foodList, setFoodList] = useState<FoodItem[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	async function fetchFoodRecommend(data: Params) {
		setPending(true);
		setError(null);
		try {
			const urlParams = new URLSearchParams({
				country: data.country,
				city: data.city,
				max_items: "10",
			});
			const res = await fetch(`/api/food-recommend?${urlParams.toString()}`);
			if (!res.ok) throw new Error("음식 추천 실패");
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
