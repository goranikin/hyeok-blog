"use client";

import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowUpRight, Home, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export type SubcategoryType = {
  href: string;
  label: string;
  external?: boolean;
};

export type NavItem = {
  href: string;
  label: string;
  external?: boolean;
  subcategories?: SubcategoryType[];
};

export const navigationItems: NavItem[] = [
  {
    href: "/study",
    label: "공부",
    subcategories: [
      { href: "/study/development", label: "개발" },
      { href: "/study/paper-review", label: "논문 리뷰" },
      { href: "/study/project", label: "프로젝트" },
    ],
  },
  {
    href: "/writing",
    label: "글",
    subcategories: [
      { href: "/writing/personal-essay", label: "삶의 기록" },
      { href: "/writing/book-review", label: "리뷰" },
    ],
  },

  {
    href: "/laboratory",
    label: "실험실",
    subcategories: [
      { href: "/laboratory/human-interface-design-class", label: "휴인디" },
    ],
  },
];

// 사이드바 네비게이션 (PC 버전)
export const SidebarNav = () => {
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState<NavItem | null>(
    navigationItems[0],
  );

  useEffect(() => {
    if (pathname) {
      const matchingCategory = navigationItems.find((item) =>
        pathname.startsWith(item.href),
      );

      if (matchingCategory) {
        setSelectedCategory(matchingCategory);
      }
    }
  }, [pathname]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center gap-3">
        <HomeButton />
        <BackButton />
      </div>

      <div className="flex flex-row flex-grow h-[calc(100%-64px)]">
        {/* 왼쪽 칸 - 메인 카테고리 */}
        <div className="w-11/12 border-r">
          <nav className="w-full p-3">
            {navigationItems.map((item, index) => (
              <div key={item.label}>
                <CategoryButton
                  item={item}
                  isActive={selectedCategory?.label === item.label}
                  onClick={() => setSelectedCategory(item)}
                />
                {/* 마지막 항목이 아니면 구분선 추가 */}
                {index < navigationItems.length - 1 && (
                  <div className="h-px bg-gray-300 my-1" />
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* 오른쪽 칸 - 서브 카테고리 */}
        <div className="w-11/12 p-4">
          {selectedCategory?.subcategories && (
            <div className="py-2">
              <h3 className="font-bold px-3 pb-3 text-xl">
                {selectedCategory.label}
              </h3>
              {selectedCategory.subcategories.map((subItem, index) => (
                <div key={subItem.href}>
                  <SubcategoryItem
                    item={subItem}
                    isActive={pathname === subItem.href}
                  />
                  {/* 마지막 항목이 아니면 구분선 추가 */}
                  {index <
                    (selectedCategory.subcategories?.length || 0) - 1 && (
                    <div className="h-px bg-gray-300 my-1" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryButton = ({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={cn(
        "w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors rounded-md mb-1 block text-xl cursor-pointer",
        isActive ? "text-black font-bold bg-gray-100" : "",
      )}
      onClick={onClick}
    >
      {item.label}
    </button>
  );
};

const SubcategoryItem = ({
  item,
  isActive,
}: {
  item: SubcategoryType;
  isActive: boolean;
}) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors text-lg",
        isActive ? "font-bold bg-gray-100" : "",
      )}
      target={item.external ? "_blank" : undefined}
    >
      {item.label}
      {item.external && <ArrowUpRight className="h-3 w-3" />}
    </Link>
  );
};

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-14 px-5 border-b flex justify-between items-center bg-background">
      <div className="flex items-center gap-3">
        <HomeButton />
        <BackButton />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-3 py-2"
          >
            <MenuIcon className="h-4 w-4 text-primary" />
            <span className="">메뉴</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="font-bold text-3xl mb-6">메뉴</SheetTitle>
          <nav className="flex flex-col">
            {navigationItems.map((category) => (
              <div key={category.label} className="mb-4">
                <Link
                  href={category.href}
                  className="text-lg font-medium hover:underline block mb-2"
                  onClick={() => setOpen(false)}
                >
                  {category.label.toUpperCase()}
                </Link>

                {category.subcategories && (
                  <div className="pl-4 border-l space-y-1">
                    {category.subcategories.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="text-sm text-muted-foreground hover:text-foreground block py-1"
                        onClick={() => setOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const HomeButton = () => {
  return (
    <Link href="/" className="cursor-pointer">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-full cursor-pointer"
      >
        <Home className="h-5 w-5 transition-all text-primary stroke-1" />
      </Button>
    </Link>
  );
};

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-5 w-5 transition-all text-primary stroke-1 " />
    </Button>
  );
};
