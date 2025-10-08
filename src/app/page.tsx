import PageLayout from "@/components/pageLayout";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center text-center py-12 space-y-6">
        {/* Profile Image */}
        <div className="relative animate-fade-in-scale">
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
        <div
          className="space-y-3"
          style={{ animation: "fadeIn 0.5s ease-out 0.2s both" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Choi JangHyeok
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            I've been reading and writing. All the things I've written are my
            vestiges of my life.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            I believe that they'll be profound nourishment for the future.
          </p>
          <div className="w-full max-w-md mx-auto border-t border-gray-300 my-4" />
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            I&apos;m starting to post in English after 2025.10.
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            The posts written before 2025.10 and the things in the personal
            essay are in Korean. I&apos;m sorry for the inconvenience of the
            English readers. I&apos;ll try to write in English for my essays
            (also translate the past posts if I can).
          </p>
        </div>

        {/* Bio */}
        <div
          className="w-full max-w-lg space-y-3 text-left"
          style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}
        >
          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200bg-white hover:border-gray-300 transition-colors duration-200">
            <span className="text-2xl mt-0.5">🎓</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">
                Seoul National University
              </h3>
              <p className="text-base text-gray-600 mt-1">
                Major in Industrial Engineering
              </p>
              <p className="text-sm text-gray-600 mt-1">
                (changed from Material Science and Engineering)
              </p>
              <p className="text-base text-gray-600 mt-1">2020.02 ~ Present</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors duration-200">
            <span className="text-2xl mt-0.5">💼</span>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900">Dalpha</h3>
              <p className="text-base text-gray-600 mt-1">AI Engineer</p>
              <p className="text-base text-gray-500 mt-1">2025.08 ~ Present</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div
          className="flex gap-4 pt-4"
          style={{ animation: "fadeIn 0.5s ease-out 0.4s both" }}
        >
          <Link
            href="https://github.com/goranikin"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-110 transition-all duration-200 bg-white">
              <FaGithub className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors duration-200" />
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/in/janghyeok-choi-571ab8347/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-110 transition-all duration-200 bg-white">
              <FaLinkedin className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/hyeok_12053/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-110 transition-all duration-200 bg-white">
              <FaInstagram className="h-6 w-6 text-gray-700 group-hover:text-pink-600 transition-colors duration-200" />
            </div>
          </Link>
          <Link
            href="https://www.threads.com/@hyeok_12053"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="p-3 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-110 transition-all duration-200 bg-white">
              <FaThreads className="h-6 w-6 text-gray-700 group-hover:text-gray-900 transition-colors duration-200" />
            </div>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
