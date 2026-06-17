import Image from "next/image";
import freshoraLogoNoText from "@/public/freshora-logo/freshora-logo-no-text.png";

interface TextDividerProps {
  children: React.ReactNode;
}
function TextDivider({ children }: TextDividerProps) {
  return (
    <section className="flex items-center gap-5 justify-center my-15">
      <div className="w-8 h-8">
        <Image
          src={freshoraLogoNoText}
          alt="freshora-logo-no-text"
          className="object-contain"
        />
      </div>
      <div>
        <p className="uppercase text-sm font-semibold tracking-wider text-brand-emerald-700">
          {children}
        </p>
      </div>
    </section>
  );
}
export default TextDivider;
