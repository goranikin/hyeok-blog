# Page Templates for New Blog Design

This document contains template code for each main page of your blog.

## Research Page Template

Create file: `src/app/research/page.tsx`

```tsx
import { ResearchCard } from "@/components/cards";

export default function ResearchPage() {
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-4">
            Research
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
            My research focuses on developing efficient and interpretable methods
            for natural language processing and machine learning.
          </p>
        </div>

        {/* Publications by Year */}
        <div className="space-y-16">
          {/* 2024 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">2024</h2>
            <div className="space-y-6">
              <ResearchCard
                title="Efficient Attention Mechanisms for Long Documents"
                authors="J. Doe, Y. Smith, A. Johnson"
                venue="NeurIPS"
                year="2024"
                abstract="We propose a novel attention mechanism that reduces computational complexity from O(n²) to O(n log n) while maintaining model quality across various language understanding tasks."
                pdfLink="#"
                arxivLink="#"
                codeLink="https://github.com"
                accent="clay"
              />

              <ResearchCard
                title="Zero-Shot Cross-Lingual Transfer in Language Models"
                authors="Y. Smith, J. Doe"
                venue="ACL"
                year="2024"
                abstract="An investigation of cross-lingual transfer capabilities in multilingual transformers without parallel training data."
                pdfLink="#"
                codeLink="https://github.com"
                accent="sky"
              />
            </div>
          </div>

          {/* 2023 */}
          <div>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">2023</h2>
            <div className="space-y-6">
              <ResearchCard
                title="Interpretable Neural Networks for Clinical Decision Support"
                authors="A. Johnson, J. Doe, M. Lee"
                venue="Nature Medicine"
                year="2023"
                abstract="We develop interpretable models that provide explanations for medical predictions, improving trust and adoption in clinical settings."
                pdfLink="#"
                projectLink="#"
                accent="coral"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Projects Page Template

Create file: `src/app/projects/page.tsx`

```tsx
import { ProjectCard } from "@/components/cards";

export default function ProjectsPage() {
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-4">
            Projects
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
            Open-source implementations and research code for the community
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectCard
            title="transformer-toolkit"
            description="A lightweight library for training and deploying transformer models with minimal boilerplate code. Includes pre-built training loops, optimization utilities, and deployment helpers."
            techStack={["Python", "PyTorch", "HuggingFace"]}
            githubLink="https://github.com/goranikin"
            date="Updated Jan 2026"
            stars={1200}
            accent="olive"
          />

          <ProjectCard
            title="attention-visualizer"
            description="Interactive visualization tool for understanding attention patterns in transformer-based models. Built with React and D3.js for real-time exploration."
            techStack={["React", "TypeScript", "D3.js"]}
            githubLink="https://github.com/goranikin"
            demoLink="#"
            date="Updated Dec 2025"
            stars={350}
            accent="heather"
          />

          <ProjectCard
            title="ml-api-template"
            description="Production-ready template for deploying machine learning models as REST APIs with monitoring, logging, and automatic documentation."
            techStack={["Python", "FastAPI", "Docker"]}
            githubLink="https://github.com/goranikin"
            date="Updated Nov 2025"
            stars={580}
            accent="sky"
          />

          <ProjectCard
            title="nlp-preprocessing-toolkit"
            description="Comprehensive text preprocessing utilities for NLP tasks including tokenization, normalization, and language detection with support for 50+ languages."
            techStack={["Python", "spaCy", "NLTK"]}
            githubLink="https://github.com/goranikin"
            date="Updated Oct 2025"
            stars={425}
            accent="coral"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## CV Page Template

Create file: `src/app/cv/page.tsx`

```tsx
import Link from "next/link";

export default function CVPage() {
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header with Download Button */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-4">
              Curriculum Vitae
            </h1>
            <p className="text-xl text-[#4A4A4A]">
              Choi JangHyeok · AI Researcher
            </p>
          </div>
          <Link
            href="/cv.pdf"
            download
            className="px-6 py-3 bg-[#6B5B3A] text-white rounded-lg font-medium hover:bg-[#4A3F28] transition-all duration-300 whitespace-nowrap"
          >
            Download PDF
          </Link>
        </div>

        {/* CV Content */}
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
            <div className="space-y-4">
              <div>
                <p className="text-base text-[#1A1A1A]">
                  <span className="font-medium">Efficient Attention Mechanisms for Long Documents</span>
                </p>
                <p className="text-sm text-[#4A4A4A] mt-1">
                  J. Doe, Y. Smith, A. Johnson
                </p>
                <p className="text-sm text-[#8A8A8A]">
                  NeurIPS 2024
                </p>
              </div>
            </div>
            <Link
              href="/research"
              className="inline-block mt-4 text-[#6B5B3A] hover:text-[#4A3F28] font-medium transition-colors"
            >
              See full list →
            </Link>
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
                  Python, TypeScript, SQL, R
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
                  Git, Docker, AWS, Linux
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
              <div className="flex justify-between">
                <p className="text-base text-[#4A4A4A]">Outstanding Paper Award, NeurIPS</p>
                <span className="text-sm text-[#8A8A8A]">2024</span>
              </div>
              <div className="flex justify-between">
                <p className="text-base text-[#4A4A4A]">Best Student Presentation, ACL</p>
                <span className="text-sm text-[#8A8A8A]">2024</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```

---

## Writing Page Template

Create file: `src/app/writing/page.tsx`

```tsx
import { WritingCard } from "@/components/cards";

export default function WritingPage() {
  return (
    <div className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-4">
            Writing
          </h1>
          <p className="text-xl text-[#4A4A4A] max-w-3xl leading-relaxed">
            Technical notes, tutorials, and personal reflections on AI research and life
          </p>
        </div>

        {/* Writing List */}
        <div className="space-y-2">
          <WritingCard
            title="Understanding Attention in Transformers"
            date="Jan 2026"
            excerpt="A deep dive into the mathematics and intuition behind attention mechanisms, with interactive visualizations and practical examples."
            tags={["Research", "Tutorial", "Deep Learning"]}
            href="/writing/attention-transformers"
          />

          <WritingCard
            title="Building Production ML Systems"
            date="Dec 2025"
            excerpt="Lessons learned from deploying machine learning models in production environments, covering monitoring, versioning, and scaling."
            tags={["Engineering", "MLOps", "Tutorial"]}
            href="/writing/production-ml"
          />

          <WritingCard
            title="Reflections on Research and Engineering"
            date="Nov 2025"
            excerpt="Thoughts on bridging the gap between academic research and industry applications in AI."
            tags={["Personal", "Career"]}
            href="/writing/research-engineering"
          />

          <WritingCard
            title="Getting Started with Natural Language Processing"
            date="Oct 2025"
            excerpt="A beginner-friendly guide to NLP covering tokenization, embeddings, and your first text classification model."
            tags={["Tutorial", "NLP", "Beginner"]}
            href="/writing/nlp-getting-started"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## Migration Instructions

See MIGRATION_GUIDE.md for step-by-step instructions on how to switch from old to new design.
