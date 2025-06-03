"use client";

import { Button } from "@/components/ui/button";
import type { FoodItem, RestaurantItem } from "../types";

type ResultsPanelProps = {
  foodList: FoodItem[] | null;
  selectedFood: FoodItem | null;
  restaurantList: RestaurantItem[] | null;
  restaurantHelp: boolean;
  restaurantPending: boolean;
  lastSearch: { country: string; city: string } | null;
  onClose: () => void;
  onFoodClick: (item: FoodItem) => void;
  onRestaurantSearch: () => void;
  onBack: () => void;
  onCancelRestaurant: () => void;
};

export default function ResultsPanel({
  foodList,
  selectedFood,
  restaurantList,
  restaurantHelp,
  restaurantPending,
  lastSearch,
  onClose,
  onFoodClick,
  onRestaurantSearch,
  onBack,
  onCancelRestaurant,
}: ResultsPanelProps) {
  if (!foodList) return null;

  return (
    <div className="absolute top-1/2 left-1/2 w-[380px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-30 flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="text-xl font-bold">음식 추천 결과</div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onClose}
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
            foodList.map((item) => (
              <div
                key={item.name}
                className="border rounded-lg p-3 bg-orange-50 shadow-sm cursor-pointer hover:bg-orange-100 transition"
                onClick={() => onFoodClick(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onFoodClick(item);
                  }
                }}
                title="클릭하면 음식점 정보를 볼 수 있습니다"
              >
                <div className="font-semibold text-lg">{item.name}</div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">현지명:</span> {item.local_name}
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
              onClick={onCancelRestaurant}
              className="cursor-pointer"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={onRestaurantSearch}
              disabled={restaurantPending}
              className={
                restaurantPending ? "cursor-not-allowed" : "cursor-pointer"
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
              onClick={onBack}
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
              restaurantList.map((r) => (
                <div
                  key={r.name}
                  className="border rounded-lg p-3 bg-blue-50 shadow-sm"
                >
                  <div className="font-semibold text-base">{r.name}</div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">주소:</span> {r.address}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">평점:</span> {r.rating} (
                    {r.user_rating_count}명)
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">가격대:</span> {r.price_level}
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
  );
}
