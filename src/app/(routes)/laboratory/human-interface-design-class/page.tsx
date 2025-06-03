"use client";

import PageLayout from "@/components/pageLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FoodSearchForm from "@/app/(routes)/laboratory/human-interface-design-class/client-components/FoodSearchForm";
import ResultsPanel from "@/app/(routes)/laboratory/human-interface-design-class/client-components/ResultsPanel";
import { useFoodRecommend } from "@/app/(routes)/laboratory/human-interface-design-class/hooks/useFoodRecommend";
import { useRestaurantSearch } from "@/app/(routes)/laboratory/human-interface-design-class/hooks/useRestaurantSearch";

import type {
  FoodItem,
  SearchFoodList,
} from "@/app/(routes)/laboratory/human-interface-design-class//types";

export default function HumanInterfaceDesignClassPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [restaurantHelp, setRestaurantHelp] = useState(false);
  const [lastSearch, setLastSearch] = useState<SearchFoodList | null>(null);

  const form = useForm<SearchFoodList>({
    defaultValues: {
      country: "",
      city: "",
    },
  });

  const { foodList, pending, fetchFoodRecommend } = useFoodRecommend();
  const {
    restaurantList,
    pending: restaurantPending,
    fetchRestaurants,
  } = useRestaurantSearch();

  async function onSubmit(data: SearchFoodList) {
    await fetchFoodRecommend(data);
    setShowForm(false);
    setLastSearch({ country: data.country, city: data.city });
    form.reset();
  }

  function handleFoodClick(item: FoodItem) {
    setSelectedFood(item);
    setRestaurantHelp(true);
  }

  // 음식점 검색 요청
  async function handleRestaurantSearch() {
    if (!selectedFood || !lastSearch) return;
    setRestaurantHelp(false);
    await fetchRestaurants({
      country: lastSearch.country,
      city: lastSearch.city,
      food: selectedFood.name,
    });
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
              setShowForm(false);
              setSelectedFood(null);
              setRestaurantHelp(false);
              setLastSearch(null);
            }}
            onFoodClick={handleFoodClick}
            onRestaurantSearch={handleRestaurantSearch}
            onBack={() => {
              setSelectedFood(null);
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
