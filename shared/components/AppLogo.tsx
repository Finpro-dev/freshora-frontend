import Image from "next/image";
import Link from "next/link";
import logo from "@/public/freshora-logo/freshora-logo.png";

function AppLogo() {
  return (
    <Link href="/" className="hidden sm:block relative h-15 w-35">
      <Image
        src={logo}
        alt="Logo"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  );
}

export default AppLogo;
