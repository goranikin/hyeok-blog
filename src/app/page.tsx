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
                Choi JangHyeok
              </h1>
              <p className="text-xl text-[#4A4A4A] leading-relaxed">
                AI Researcher focused on natural language processing and machine
                learning. AI Engineer at Dalpha, pursuing Industrial Engineering
                at Seoul National University.
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                I develop methods for understanding and generating human
                language, with applications in real-world AI systems and
                accessibility.
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
    </>
  );
}
