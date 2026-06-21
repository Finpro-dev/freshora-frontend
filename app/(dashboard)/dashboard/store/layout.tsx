import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div>
      <section>
        {" "}
        <div className="flex mt-5 justify-center gap-5 py-10 sticky w-full border-b border-brand-mist-300 left-0 top-0">
          <Link href="/dashboard/store">All Store</Link>
          <Link href="/dashboard/store/new">Create Store</Link>
        </div>
        {children}
      </section>
    </div>
  );
}

export default layout;
