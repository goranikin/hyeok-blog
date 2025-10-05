"use client";

import {
  categoriesConfig,
  laboratoryRoutes,
} from "@/config/collections";
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

/**
 * Generate navigation items from centralized configuration
 * This automatically creates navigation structure from collections config
 */
export const navigationItems: NavItem[] = categoriesConfig.map((category) => {
  const subcategories: SubcategoryType[] =
    category.key === "laboratory"
      ? laboratoryRoutes.map((route) => ({
          href: route.path,
          label: route.label,
        }))
      : category.collections.map((collection) => ({
          href: collection.path,
          label: collection.label,
        }));

  return {
    href: category.path,
    label: category.label,
    subcategories,
  };
});

// 사이드바 네비게이션 (PC 버전) - Narrow Sidebar Design
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-2">
        <HomeButton />
        <BackButton />
      </div>

      {/* Navigation Categories */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigationItems.map((item, index) => (
          <div 
            key={item.label}
            style={{
              animation: `fadeIn 0.4s ease-out ${(index + 1) * 0.1}s both`,
            }}
          >
            <CategoryButton
              item={item}
              isActive={selectedCategory?.label === item.label}
              onClick={() => setSelectedCategory(item)}
            />

            {/* Subcategories - show when selected */}
            {selectedCategory?.label === item.label && item.subcategories && (
              <div 
                className="mt-1 ml-2 space-y-1 overflow-hidden"
                style={{
                  animation: "slideDown 0.3s ease-out",
                }}
              >
                {item.subcategories.map((subItem, subIndex) => (
                  <div
                    key={subItem.href}
                    style={{
                      animation: `fadeIn 0.2s ease-out ${subIndex * 0.05}s both`,
                    }}
                  >
                    <SubcategoryItem
                      item={subItem}
                      isActive={pathname.startsWith(subItem.href)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
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
        "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
        isActive 
          ? "bg-white shadow-sm text-black scale-[1.02]" 
          : "hover:bg-white/50 text-gray-700 hover:translate-x-1"
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
        "block px-3 py-1.5 text-sm rounded-md transition-all duration-200 group",
        isActive 
          ? "text-gray-900 font-medium bg-white/50 translate-x-1" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:translate-x-1"
      )}
      target={item.external ? "_blank" : undefined}
    >
      <div className="flex items-center gap-1">
        <ArrowUpRight className={cn(
          "h-3 w-3 transition-all duration-200",
          item.external 
            ? "opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
            : "opacity-0"
        )} />
        <span>{item.label}</span>
      </div>
    </Link>
  );
};

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
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
    <div className="fixed top-0 left-0 right-0 z-50 h-14 px-4 border-b flex justify-between items-center bg-white animate-slide-in">
      <div className="flex items-center gap-2">
        <HomeButton />
        <BackButton />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md group"
          >
            <MenuIcon className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-gray-50">
          <SheetTitle className="font-bold text-2xl mb-6">Menu</SheetTitle>
          <nav className="flex flex-col space-y-1">
            {navigationItems.map((category) => (
              <div key={category.label}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors",
                    selectedCategory?.label === category.label
                      ? "bg-white shadow-sm text-black"
                      : "hover:bg-white/50 text-gray-700"
                  )}
                >
                  {category.label}
                </button>

                {selectedCategory?.label === category.label && category.subcategories && (
                  <div className="mt-1 ml-2 space-y-1 mb-2">
                    {category.subcategories.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md transition-colors",
                          pathname.startsWith(subItem.href)
                            ? "text-gray-900 font-medium bg-white/50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                        )}
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
    <Link href="/">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 group"
      >
        <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
      </Button>
    </Link>
  );
};

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 group"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
    </Button>
  );
};
