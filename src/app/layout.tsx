import { Footer } from "@/components/footer";
import { TopNavigation } from "@/components/top-navigation";
import "katex/dist/katex.min.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyeok's Blog - AI Researcher",
  description:
    "Personal website and research portfolio of Choi JangHyeok, AI Researcher focused on natural language processing and machine learning.",
  icons: {
    icon: "/images/itisme.png",
  },
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={pretendard.variable}>
      <body className={`${pretendard.className} min-w-[320px]`}>
        {/* Top Navigation - Fixed */}
        <TopNavigation />

        {/* Main Content - Starts below nav */}
        <main className="pt-[72px] min-h-screen bg-white">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
