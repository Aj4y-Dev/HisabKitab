import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex bg-pale-blue-grey dark:bg-dark-bg min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar userName="Ramesh" />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
