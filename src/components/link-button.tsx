import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
}

export default function LinkButton({
  href,
  label,
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white ${className}`}
    >
      <span className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors tracking-tight">
        {label}
      </span>
      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </Link>
  );
}
