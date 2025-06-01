"use client";

import PageLayout from "@/components/pageLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FoodSearchForm from "./client-components/FoodSearchForm";
import ResultsPanel from "./client-components/ResultsPanel";
import Error from "next/error";

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

export type Search = {
  country: string;
  city: string;
};

export default function HumanInterfaceDesignClassPage() {
  const [showForm, setShowForm] = useState(false);
  const [pending, setPending] = useState(false);
  const [foodList, setFoodList] = useState<FoodItem[] | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [restaurantList, setRestaurantList] = useState<RestaurantItem[] | null>(
    null,
  );
  const [restaurantPending, setRestaurantPending] = useState(false);
  const [restaurantHelp, setRestaurantHelp] = useState(false);
  const [lastSearch, setLastSearch] = useState<Search | null>(null);
  const form = useForm<Search>({
    defaultValues: {
      country: "",
      city: "",
    },
  });

  async function onSubmit(data: Search) {
    setPending(true);
    try {
      const res = await fetch(
        `/api/food-recommend?country=${encodeURIComponent(data.country)}&city=${encodeURIComponent(data.city)}&max_items=10`,
      );
      if (!res.ok) throw new Error("추천 실패");
      const result = await res.json();
      setFoodList(result); // 결과 저장
      setShowForm(false); // 폼 닫기
      setLastSearch({ country: data.country, city: data.city });
    } catch {
      alert(`에러`);
    }
    setPending(false);
    form.reset();
  }

  // 음식 클릭 시 도움말 표시
  function handleFoodClick(item: FoodItem) {
    setSelectedFood(item);
    setRestaurantHelp(true);
    setRestaurantList(null);
  }

  // 음식점 검색 요청
  async function fetchRestaurants() {
    if (!selectedFood || !lastSearch) return;
    setRestaurantPending(true);
    setRestaurantHelp(false);
    setRestaurantList(null);
    try {
      const params = new URLSearchParams({
        country: lastSearch.country,
        city: lastSearch.city,
        food: selectedFood.name,
        max_results: "10",
      });
      const res = await fetch(`/api/search-restaurant?${params.toString()}`);
      if (!res.ok) throw new Error("음식점 검색 실패");
      const result = await res.json();
      setRestaurantList(result);
    } catch {
      setRestaurantList([]);
    }
    setRestaurantPending(false);
  }

  return (
    <PageLayout
      title="휴먼 인터페이스 디자인 수업용"
      description="구글 지도에서 LLM이 음식과 음식점을 추천해줍니다."
    >
      <div className="flex justify-center items-center min-h-[500px] relative">
        <Image
          src="/laboratory/human-interface-design-class/google-map.jpeg"
          alt="Map"
          width={400}
          height={500}
          className="block"
        />
        <Button
          className="absolute top-1/2 right-1/5 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-400 shadow-lg flex items-center justify-center hover:bg-orange-300 transition cursor-pointer"
          style={{ zIndex: 2 }}
          type="button"
          onClick={() => setShowForm(true)}
        >
          <span className="text-2xl font-bold text-gray-700">AI</span>
        </Button>
        {/* 폼 또는 로딩 메시지 */}
        {showForm && (
          <FoodSearchForm
            form={form}
            pending={pending}
            onSubmit={onSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
        {/* 결과 UI */}
        {foodList && !showForm && (
          <ResultsPanel
            foodList={foodList}
            selectedFood={selectedFood}
            restaurantList={restaurantList}
            restaurantHelp={restaurantHelp}
            restaurantPending={restaurantPending}
            lastSearch={lastSearch}
            onClose={() => {
              setFoodList(null);
              setSelectedFood(null);
              setRestaurantList(null);
              setRestaurantHelp(false);
            }}
            onFoodClick={handleFoodClick}
            onRestaurantSearch={fetchRestaurants}
            onBack={() => {
              setSelectedFood(null);
              setRestaurantList(null);
              setRestaurantHelp(false);
            }}
            onCancelRestaurant={() => {
              setSelectedFood(null);
              setRestaurantHelp(false);
            }}
          />
        )}
      </div>
    </PageLayout>
  );
}
