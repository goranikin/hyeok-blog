import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type * as React from "react";

interface LinkButtonProps {
  href: string;
  label: React.ReactNode;
  className?: string;
  iconClassName?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}

export default function LinkButton({
  href,
  label,
  className = "",
  iconClassName = "ml-2",
  variant = "outline",
  size = undefined,
}: LinkButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={`justify-between text-lg font-medium px-6 py-4 ${className}`}
    >
      <Link href={href} className="flex items-center w-full justify-between">
        <span>{label}</span>
        <ArrowRightIcon className={iconClassName} />
      </Link>
    </Button>
  );
}
