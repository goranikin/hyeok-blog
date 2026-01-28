import { FeaturedCard } from "@/components/cards";
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
              <h1 className="text-5xl lg:text-6xl font-semibold text-[#1A1A1A] leading-tight animate-fade-in">
                Choi JangHyeok
              </h1>
              <p className="text-xl text-[#4A4A4A] leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
                AI Researcher focused on natural language processing and machine learning.
                AI Engineer at Dalpha, pursuing Industrial Engineering at Seoul National University.
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                I develop methods for understanding and generating human language,
                with applications in real-world AI systems and accessibility.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Link
                  href="/research"
                  className="px-6 py-3 bg-[#6B5B3A] text-white rounded-lg font-medium hover:bg-[#4A3F28] transition-all duration-300 hover:shadow-md"
                >
                  View Research
                </Link>
                <Link
                  href="/cv"
                  className="px-6 py-3 border-2 border-[#6B5B3A] text-[#6B5B3A] rounded-lg font-medium hover:bg-[#6B5B3A] hover:text-white transition-all duration-300"
                >
                  Download CV
                </Link>
              </div>
            </div>

            {/* Right: Photo */}
            <div className="flex justify-center lg:justify-end animate-fade-in-scale" style={{ animationDelay: "0.2s" }}>
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

      {/* Recent Highlights Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-3">
              Recent Highlights
            </h2>
            <p className="text-lg text-[#4A4A4A]">
              Latest work across research, projects, and writing
            </p>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedCard
              type="paper"
              title="Efficient Attention Mechanisms for Long Documents"
              description="We propose a novel attention mechanism that reduces computational complexity from O(n²) to O(n log n) while maintaining model quality."
              link="/research"
              accent="clay"
            />
            <FeaturedCard
              type="project"
              title="Transformer Toolkit"
              description="A lightweight library for training and deploying transformer models with minimal boilerplate code. Built with PyTorch and HuggingFace."
              link="/projects"
              accent="sky"
            />
            <FeaturedCard
              type="post"
              title="Understanding Attention in Transformers"
              description="A deep dive into the mathematics and intuition behind attention mechanisms, with interactive visualizations."
              link="/writing"
              accent="coral"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* Updates/News Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#1A1A1A] mb-8">
            Recent Updates
          </h2>

          <div className="space-y-6">
            {/* Update Item */}
            <div className="flex gap-6 py-4 border-b border-[#EFEFEF] last:border-0">
              <time className="text-sm text-[#8A8A8A] font-medium min-w-[100px]">
                Jan 2026
              </time>
              <p className="text-base text-[#4A4A4A] flex-1">
                Started as AI Engineer at <span className="font-medium text-[#1A1A1A]">Dalpha</span>
              </p>
            </div>

            <div className="flex gap-6 py-4 border-b border-[#EFEFEF] last:border-0">
              <time className="text-sm text-[#8A8A8A] font-medium min-w-[100px]">
                Dec 2025
              </time>
              <p className="text-base text-[#4A4A4A] flex-1">
                New blog post: <Link href="/writing" className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium">Understanding Attention in Transformers</Link>
              </p>
            </div>

            <div className="flex gap-6 py-4 border-b border-[#EFEFEF] last:border-0">
              <time className="text-sm text-[#8A8A8A] font-medium min-w-[100px]">
                Oct 2025
              </time>
              <p className="text-base text-[#4A4A4A] flex-1">
                Relaunched blog with new design and English content
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
