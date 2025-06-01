import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { country, city, food, max_results } = req.query;

	if (!country || !city || !food) {
		res
			.status(400)
			.json({ error: "country, city, food 파라미터가 필요합니다." });
		return;
	}

	const apiUrl = `http://localhost:8000/search-restaurant?country=${encodeURIComponent(
		country as string,
	)}&city=${encodeURIComponent(city as string)}&food=${encodeURIComponent(food as string)}&max_results=${max_results || 10}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("FastAPI 서버 오류");
		}
		const data = await response.json();
		res.status(200).json(data);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
}
