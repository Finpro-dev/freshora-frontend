import Link from "next/link";
import { STORE_MENU_STATIC } from "./_statics/store-menu-static";
import StoreMenuBar from "./_components/StoreMenuBar";

interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div>
      <section>
        <StoreMenuBar />
        {children}
      </section>
    </div>
  );
}

export default layout;
