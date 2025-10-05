import PageLayout from "@/components/pageLayout";
import { Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-12 space-y-6">
        {/* Profile Image */}
        <div className="relative">
          <Image
            alt="Profile"
            src="/images/itisme.PNG"
            width={160}
            height={160}
            className="rounded-full border-4 border-gray-100 shadow-lg"
            priority
          />
        </div>

        {/* Name and Title */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            장혁이의 블로그
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Welcome to my blog
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 pt-4">
          <Link
            href="https://github.com/goranikin"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white">
              <Github className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/hyeok_12053/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white">
              <Instagram className="h-6 w-6 text-gray-700 group-hover:text-pink-600 transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
