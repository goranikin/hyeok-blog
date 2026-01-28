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
                Choi JangHyeok · AI Researcher & Engineer
              </p>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Passionate about building intelligent systems that understand and
                generate human language. Currently working at Dalpha and studying
                Industrial Engineering at Seoul National University.
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
                  <span className="text-sm text-[#8A8A8A]">2020 - Present</span>
                </div>
                <p className="text-base text-[#4A4A4A]">
                  B.S. in Industrial Engineering
                </p>
                <p className="text-sm text-[#8A8A8A] mt-1">
                  Previously: Material Science and Engineering
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
                  <span className="text-sm text-[#8A8A8A]">Aug 2025 - Present</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-base text-[#4A4A4A]">
                  <li>Developing AI systems for natural language understanding</li>
                  <li>Building scalable ML infrastructure and deployment pipelines</li>
                  <li>Collaborating with product teams on AI feature development</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Publications */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Selected Publications
            </h2>
            <p className="text-base text-[#4A4A4A] mb-4">
              For a complete list of publications, visit the{" "}
              <Link
                href="/research"
                className="text-[#6B5B3A] hover:text-[#4A3F28] font-medium transition-colors"
              >
                Research page →
              </Link>
            </p>
            {/* Add your key publications here */}
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">Languages</h3>
                <p className="text-base text-[#4A4A4A]">
                  Python, TypeScript, JavaScript, SQL
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">ML/AI</h3>
                <p className="text-base text-[#4A4A4A]">
                  PyTorch, TensorFlow, HuggingFace, scikit-learn
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">Web</h3>
                <p className="text-base text-[#4A4A4A]">
                  React, Next.js, Node.js, FastAPI
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">Tools</h3>
                <p className="text-base text-[#4A4A4A]">
                  Git, Docker, AWS, Linux, Bun
                </p>
              </div>
            </div>
          </section>

          {/* Awards & Honors */}
          <section>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6 pb-2 border-b border-[#EFEFEF]">
              Awards & Honors
            </h2>
            <div className="space-y-3">
              {/* Add your awards here */}
              <p className="text-base text-[#4A4A4A]">
                To be updated with your awards and achievements.
              </p>
            </div>
          </section>
          </div>
        </div>
      </section>
    </>
  );
}
