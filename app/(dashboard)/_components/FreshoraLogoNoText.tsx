import freshoraLogo from "@/public/freshora-logo/freshora-logo-no-text.png";
import Image from "next/image";

interface FreshoraLogoNoTextProps {
  width?: number;
  height?: number;
}

function FreshoraLogoNoText({
  width = 8,
  height = 8,
}: FreshoraLogoNoTextProps) {
  return (
    <div className={`relative w-${width} h-${height} block md:hidden`}>
      <Image
        src={freshoraLogo}
        fill
        alt="freshora-logo"
        sizes="(max-width: 768px) 15vw, (max-width: 1200px) 10vw, 8vw"
      />
    </div>
  );
}

export default FreshoraLogoNoText;
