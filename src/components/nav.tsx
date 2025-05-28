"use client";

import { cn } from "@/utils/cn";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Nav = {
	href: string;
	label: string;
	external?: boolean;
};

export const navs = [
	{
		href: "/writing",
		label: "글",
	},
	{
		href: "/development",
		label: "개발",
	},
	{
		href: "/laboratory",
		label: "실험실",
	},
];

export const Nav = () => {
	return (
		<nav className="flex grow justify-evenly items-center space-x-6 text-lg font-medium gap-2">
			{navs.map((nav) => (
				<NavItem key={nav.label} {...nav} />
			))}
		</nav>
	);
};

export function NavItem({
	href,
	label,
	external,
	onClick,
}: Nav & { onClick?: () => void }) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"transition-colors hover:font-bold py-3 text-primary flex items-center",
				pathname?.startsWith(href) && "underline underline-offset-4 font-bold",
			)}
			target={external ? "_blank" : undefined}
			onClick={onClick}
		>
			{label.toUpperCase()}
			{external && <ArrowUpRight className="h-4 w-4" />}
		</Link>
	);
}
