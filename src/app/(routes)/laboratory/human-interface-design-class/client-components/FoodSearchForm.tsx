"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";

type FoodSearchFormProps = {
	form: UseFormReturn<{ country: string; city: string }>;
	pending: boolean;
	onSubmit: (data: { country: string; city: string }) => void;
	onCancel: () => void;
};

export default function FoodSearchForm({
	form,
	pending,
	onSubmit,
	onCancel,
}: FoodSearchFormProps) {
	return (
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
								onClick={onCancel}
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
	);
}
