export const Footer = () => {
  return (
    <footer className="bg-[#FAF9F6] border-t border-[#EFEFEF] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center space-y-4">
          <p className="text-sm text-[#8A8A8A]">
            © {new Date().getFullYear()} Choi JangHyeok. Design inspired by
            Anthropic&apos;s warm minimalism.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="mailto:goranikin@snu.ac.kr"
              className="text-sm text-[#6B5B3A] hover:text-[#4A3F28] transition-colors duration-200"
            >
              Email
            </a>
            <a
              href="https://github.com/goranikin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6B5B3A] hover:text-[#4A3F28] transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/janghyeok-choi-571ab8347/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6B5B3A] hover:text-[#4A3F28] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6B5B3A] hover:text-[#4A3F28] transition-colors duration-200"
            >
              Scholar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
