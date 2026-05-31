import { PREVIEW_THUMBNAILS } from "@/src/config";
import Image from "next/image";

interface ThumbnailProps {
  type: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ type }) => {
  const image = PREVIEW_THUMBNAILS[type] || PREVIEW_THUMBNAILS.default;

  return (
    <Image
      src={image}
      alt="Jaguar"
      width={380}
      height={240}
      className="h-60 w-full object-cover rounded-lg"
      loading="eager"
    />
  );
};
