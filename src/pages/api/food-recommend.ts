import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { country, city, max_items } = req.query;

	const apiUrl = `http://localhost:8000/food-recommend?country=${encodeURIComponent(
		country as string,
	)}&city=${encodeURIComponent(city as string)}&max_items=${max_items || 10}`;

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
