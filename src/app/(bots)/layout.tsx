import MobileNav from "@/components/sidebar/mobile-nav";
import Sidebar from "@/components/sidebar/sidebar-box";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative h-screen flex flex-grow bg-muted">
        <Sidebar />
        <div className="absolute top-0 left-0 z-0 h-full w-full bg-muted bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(10,30,80,0.5),rgba(0,0,0,0))]" />
        <div className="flex flex-col w-full relative">
          <MobileNav />
          {children}
        </div>
      </main>
    </>
  );
}
