"use client";

import PageLayout from "@/components/pageLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FoodItem = {
  name: string;
  local_name: string;
  english_name: string;
  description: string;
};

type RestaurantItem = {
  name: string;
  address: string;
  rating: number;
  user_rating_count: number;
  price_level: string;
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
  const [lastSearch, setLastSearch] = useState<{
    country: string;
    city: string;
  } | null>(null);
  const form = useForm({
    defaultValues: {
      country: "",
      city: "",
    },
  });

  async function onSubmit(data: { country: string; city: string }) {
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
    } catch (e: any) {
      alert(`에러: ${e.message}`);
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
      const res = await fetch(
        `/api/search-restaurant?${params.toString()}`
      );
      if (!res.ok) throw new Error("음식점 검색 실패");
      const result = await res.json();
      setRestaurantList(result);
    } catch (e: any) {
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
          <div className="absolute top-1/2 left-1/2 w-90 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-30 flex flex-col items-center min-w-[320px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl py-3">
                        음식을 추천해드릴게요!
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full border rounded px-3 py-2"
                          placeholder="국가 (ex. 일본)"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full border rounded px-3 py-2"
                          placeholder="도시 (ex. 도쿄)"
                          disabled={pending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  {pending && (
                    <div className="text-lg text-orange-400 text-center font-semibold py-2">
                      AI가 정보를 생성하고 있어요!
                      <br />
                      조금만 기다려주세요. 😊
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="cursor-pointer transition duration-200 hover:bg-gray-300"
                      onClick={() => setShowForm(false)}
                      disabled={pending}
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      disabled={pending}
                      className={`transition duration-200 hover:bg-orange-600 ${
                        pending ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      제출
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        )}

        {/* 결과 UI */}
        {foodList && !showForm && (
          <div className="absolute top-1/2 left-1/2 w-[380px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-30 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <div className="text-xl font-bold">음식 추천 결과</div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setFoodList(null);
                  setSelectedFood(null);
                  setRestaurantList(null);
                  setRestaurantHelp(false);
                }}
                className="ml-2 cursor-pointer transition duration-200 hover:bg-gray-300"
              >
                닫기
              </Button>
            </div>
            {/* 음식 리스트 */}
            {!selectedFood && (
              <div className="w-full flex flex-col gap-4 max-h-[350px] overflow-y-auto">
                {foodList.length === 0 ? (
                  <div className="text-gray-500 text-center">
                    추천 결과가 없습니다.
                  </div>
                ) : (
                  foodList.map((item, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-3 bg-orange-50 shadow-sm cursor-pointer hover:bg-orange-100 transition"
                      onClick={() => handleFoodClick(item)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleFoodClick(item);
                        }
                      }}
                      title="클릭하면 음식점 정보를 볼 수 있습니다"
                    >
                      <div className="font-semibold text-lg">{item.name}</div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">현지명:</span>{" "}
                        {item.local_name}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">영문명:</span>{" "}
                        {item.english_name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {/* 음식 클릭 시 도움말 */}
            {selectedFood && restaurantHelp && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="text-gray-700 text-center text-lg">
                  <span className="font-bold text-orange-400">
                    {lastSearch?.country} {lastSearch?.city}
                  </span>
                  에서
                  <br />
                  <span className="font-bold text-orange-400">
                    {selectedFood.name}
                  </span>
                  를 파는
                  <br />
                  음식점을 검색할까요?
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setSelectedFood(null);
                      setRestaurantHelp(false);
                    }}
                    className="cursor-pointer"
                  >
                    취소
                  </Button>
                  <Button
                    type="button"
                    onClick={fetchRestaurants}
                    disabled={restaurantPending}
                    className={
                      restaurantPending
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  >
                    {restaurantPending ? "검색 중..." : "음식점 검색"}
                  </Button>
                </div>
              </div>
            )}
            {/* 음식점 검색 결과 */}
            {selectedFood && !restaurantHelp && (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="w-full flex justify-between items-center">
                  <div className="font-bold text-orange-600">
                    {selectedFood.name} 음식점 리스트
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedFood(null);
                      setRestaurantList(null);
                      setRestaurantHelp(false);
                    }}
                  >
                    뒤로
                  </Button>
                </div>
                <div className="w-full flex flex-col gap-3 max-h-[250px] overflow-y-auto">
                  {restaurantPending ? (
                    <div className="text-orange-500 text-center font-semibold py-2">
                      음식점 정보를 불러오는 중입니다...
                    </div>
                  ) : restaurantList && restaurantList.length > 0 ? (
                    restaurantList.map((r, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-3 bg-blue-50 shadow-sm"
                      >
                        <div className="font-semibold text-base">{r.name}</div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">주소:</span> {r.address}
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">평점:</span> {r.rating}{" "}
                          ({r.user_rating_count}명)
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">가격대:</span>{" "}
                          {r.price_level}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center">
                      음식점 정보를 찾을 수 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
