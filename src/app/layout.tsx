import { MobileNav, SidebarNav } from "@/components/navigation";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyeok's Blog",
  icons: {
    icon: "/images/itisme.png",
  },
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.className}>
      <body className="min-w-[320px] mx-auto">
        {/* 모바일 네비게이션 - 모바일에서만 표시 */}
        <div className="sm:hidden">
          <MobileNav />
        </div>

        <div className="flex flex-row min-h-screen">
          {/* 사이드바 (PC에서만 표시) - Narrow design */}
          <aside className="hidden sm:block w-56 border-r shrink-0 h-screen sticky top-0">
            <SidebarNav />
          </aside>

          {/* 메인 콘텐츠 영역 - Centered with max-width */}
          <main className="flex-1 overflow-hidden sm:pt-0 pt-16 bg-white">
            {/* pt-16은 모바일 네비게이션(h-14)을 고려한 여백 */}
            <div className="max-w-4xl mx-auto py-8 px-6 md:px-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
