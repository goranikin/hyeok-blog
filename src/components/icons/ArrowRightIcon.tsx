import type * as React from "react";

export function ArrowRightIcon({
  className = "",
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <title>Arrow Right</title>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default ArrowRightIcon;
