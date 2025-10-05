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
        {navigationItems.map((item) => (
          <div key={item.label}>
            <CategoryButton
              item={item}
              isActive={selectedCategory?.label === item.label}
              onClick={() => setSelectedCategory(item)}
            />

            {/* Subcategories - show when selected */}
            {selectedCategory?.label === item.label && item.subcategories && (
              <div className="mt-1 ml-2 space-y-1">
                {item.subcategories.map((subItem) => (
                  <SubcategoryItem
                    key={subItem.href}
                    item={subItem}
                    isActive={pathname.startsWith(subItem.href)}
                  />
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
        "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-white shadow-sm text-black" 
          : "hover:bg-white/50 text-gray-700"
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
        "block px-3 py-1.5 text-sm rounded-md transition-colors group",
        isActive 
          ? "text-gray-900 font-medium bg-white/50" 
          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
      )}
      target={item.external ? "_blank" : undefined}
    >
      <div className="flex items-center gap-1">
        <ArrowUpRight className={cn(
          "h-3 w-3 transition-transform group-hover:translate-x-0.5",
          item.external ? "opacity-100" : "opacity-0"
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
    <div className="fixed top-0 left-0 right-0 z-50 h-14 px-4 border-b flex justify-between items-center bg-white">
      <div className="flex items-center gap-2">
        <HomeButton />
        <BackButton />
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-md"
          >
            <MenuIcon className="h-5 w-5" />
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
        className="h-8 w-8"
      >
        <Home className="h-4 w-4" />
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
      className="h-8 w-8"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};
