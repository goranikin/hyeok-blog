import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight">
                Choi Janghyeok
              </h1>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                Hi. I'm Janghyeok.
              </p>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                I like reading, writing, coffee, marathon, climbing, and
                swimming.
              </p>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                You can see my personal thoughts on my{" "}
                <Link
                  href="https://www.instagram.com/hyeok_12053/?hl=en"
                  className="text-[#456eff] hover:text-[#4A3F28] transition-colors duration-200 underline"
                >
                  Personal SNS
                </Link>{" "}
                (in Korean).
              </p>
              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-4 pt-4"
                style={{ animationDelay: "0.3s" }}
              >
                <Link
                  href="/research"
                  className="px-6 py-3 bg-[#6B5B3A] text-white rounded-lg font-medium hover:bg-[#4A3F28] transition-all duration-300 hover:shadow-md"
                >
                  View Research
                </Link>
                <Link
                  href="/cv.pdf"
                  className="px-6 py-3 border-2 border-[#6B5B3A] text-[#6B5B3A] rounded-lg font-medium hover:bg-[#6B5B3A] hover:text-white transition-all duration-300"
                >
                  Download CV
                </Link>
              </div>
            </div>

            {/* Right: Photo */}
            <div
              className="flex justify-center lg:justify-end animate-fade-in-scale"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <Image
                  alt="Choi JangHyeok"
                  src="/images/itisme.PNG"
                  width={400}
                  height={400}
                  className="rounded-2xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* Activity Photos */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/marathon.jpeg"
                  alt="Running a marathon"
                  fill
                  className="object-cover rounded-2xl shadow-md"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/climbing.jpeg"
                  alt="Climbing on a wall"
                  fill
                  className="object-cover rounded-2xl shadow-md"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            <div>
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src="/images/tri.jpeg"
                  alt="Triathlon event"
                  fill
                  className="object-cover rounded-2xl shadow-md"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
