import type { Metadata } from "next";
import "./globals.css";
import { MobileNav, SidebarNav } from "@/components/navigation";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Hyeok's Blog",
  icons: {
    icon: "/itisme.png",
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
    <html lang="ko" className={`${pretendard.className}`}>
      <body className="min-w-[320px] mx-auto">
        {/* 모바일 네비게이션 - 모바일에서만 표시 */}
        <div className="sm:hidden">
          <MobileNav />
        </div>

        <div className="flex flex-row min-h-screen">
          {/* 사이드바 (PC에서만 표시) */}
          <aside className="hidden sm:block w-[350px] border-r shrink-0 h-screen sticky top-0">
            <SidebarNav />
          </aside>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 overflow-hidden sm:pt-6 pt-16">
            {" "}
            {/* pt-16은 모바일 네비게이션(h-14)을 고려한 여백 */}
            <div className="container mx-auto py-4 px-4 md:px-20">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
