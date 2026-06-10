import AppNavbar from "@/shared/components/AppNavbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-full">
      <AppNavbar />
      {children}
    </div>
  );
}

export default layout;
