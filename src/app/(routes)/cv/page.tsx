import Link from "next/link";

export default function CVPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 animate-fade-in">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-6 leading-tight">
                Curriculum Vitae
              </h1>
              <p className="text-xl text-[#4A4A4A] mb-3">
                Janghyeok Choi · AI Engineer
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                AI Engineer specializing in data augmentation, LLM agents, and machine learning pipelines.
                Currently studying Industrial Engineering at Seoul National University.
              </p>
            </div>
            <Link
              href="/cv.pdf"
              download
              className="px-6 py-3 bg-[#6B5B3A] text-white rounded-lg font-medium hover:bg-[#4A3F28] transition-all duration-300 hover:shadow-md whitespace-nowrap h-fit"
            >
              Download PDF
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-t border-[#EFEFEF]" />

      {/* CV Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-12">
          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Education
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    Seoul National University
                  </h3>
                  <span className="text-sm text-[#8A8A8A]">Mar. 2020 - Present</span>
                </div>
                <p className="text-base text-[#4A4A4A]">
                  B.S. in Industrial Engineering
                </p>
                <p className="text-sm text-[#8A8A8A] mt-1">
                  CGPA: 3.54/4.3
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    AI Engineer · Dalpha
                  </h3>
                  <span className="text-sm text-[#8A8A8A]">Aug. 2025 - Nov. 2025</span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-base text-[#4A4A4A]">
                  <li>
                    <strong>Order Quantity Prediction (Contracted Project):</strong> Data Pipeline, Statistical Analysis, Machine Learning
                  </li>
                  <li>
                    <strong>Customer Service Chatbot (Discontinued):</strong> Data Augmentation & Refinement, LLM Agent, Prompt Engineering, Data Pipeline
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Projects
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-[#1A1A1A]">
                    LitSearch Data Augmentation
                  </h3>
                  <span className="text-sm text-[#8A8A8A]">Mar. 2025 - Jun. 2025</span>
                </div>
              </div>
            </div>
            <p className="text-base text-[#4A4A4A] mt-4">
              For more details, visit the{" "}
              <Link
                href="/projects"
                className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium transition-colors"
              >
                Projects page →
              </Link>
            </p>
          </section>

          {/* Publications */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Publications
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-base text-[#1A1A1A] mb-1">
                  <strong>(Under Writing) DALDALL: Data Augmentation for Lexical and Semantic Diverse in Legal Domain by leveraging LLM-Persona</strong>
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  Janghyeok Choi, Jaewon Lee
                </p>
              </div>
            </div>
            <p className="text-base text-[#4A4A4A] mt-4">
              For a complete list of publications, visit the{" "}
              <Link
                href="/research"
                className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium transition-colors"
              >
                Research page →
              </Link>
            </p>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Technical Skills
            </h2>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Programming Languages</h3>
              <p className="text-base text-[#4A4A4A]">
                Python, JavaScript, TypeScript, Rust
              </p>
            </div>
          </section>

          {/* Military Service */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Military Service
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-[#1A1A1A]">
                  Republic of Korea Air Force
                </h3>
                <span className="text-sm text-[#8A8A8A]">Apr. 2022 - Jan. 2024</span>
              </div>
            </div>
          </section>

          {/* Awards & Honors */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Awards & Honors
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-semibold text-[#1A1A1A]">
                    Altwell Mincho Scholarship
                  </h3>
                  <p className="text-sm text-[#4A4A4A] mt-1">
                    Merit-based scholarship awarded to promising students
                  </p>
                </div>
                <span className="text-sm text-[#8A8A8A] whitespace-nowrap ml-4">Mar. 2021 - Present</span>
              </div>
            </div>
          </section>
          </div>
        </div>
      </section>
    </>
  );
}
