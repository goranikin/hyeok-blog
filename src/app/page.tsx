import PageLayout from "@/components/pageLayout";
import { Button } from "@/components/ui/button";
import { Github, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <PageLayout>
      <Image
        alt="큰제비갈매기"
        src="/images/itisme.PNG"
        width={300}
        height={300}
        className="self-center rounded-full shadow-lg"
      />
      <h1 className="self-center text-2xl font-bold mt-4 mb-2">
        장혁이의 블로그
      </h1>

      <div className="flex gap-4 self-center mt-2">
        <Link
          href="https://github.com/goranikin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <Github className="h-5 w-5" />
          </Button>
        </Link>
        <Link
          href="https://www.instagram.com/hyeok_12053/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" size="icon" className="rounded-full">
            <Instagram className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </PageLayout>
  );
}
