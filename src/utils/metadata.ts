import { BASE_URL } from "@/constants/network";
import type { Metadata } from "next";

type MetadataProps = {
  title: string;
  description: string;
  path: string;
  publishDate: string | Date;
  image?: string;
};

const DEFAULT_IMAGE = "/itisme.png";

export default function metadata(props: MetadataProps): Metadata {
  const { title, description: desc, path, image } = props;
  const description = `${desc} | 큰제비갈매기의 이야기, hyeok12053.dev`;

  const images = BASE_URL + (image ?? DEFAULT_IMAGE);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: BASE_URL + path,
      siteName: "hyeok12053.dev",
      images,
      locale: "ko_KR",
    },
  };
}
