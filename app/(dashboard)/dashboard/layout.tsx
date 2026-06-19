import { Metadata } from "next";
import DashboardSideBar from "../_components/DashboardSideBar";

export const metadata: Metadata = {
  title: "Dashboard",
};

interface DashboardLayout {
  children: React.ReactNode;
}

function layout({ children }: DashboardLayout) {
  return (
    <div className="min-h-dvh w-full">
      <div className="flex min-h-dvh">
        <DashboardSideBar />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}

export default layout;
