"use client";
import { useEffect, useState } from "react";
import Logo from "../header/logo";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import ChatHistory from "./chat-history";
import SidebarToggle from "./sidebar-toggle";
import { usePathname } from "next/navigation";

export default function SidebarBox() {
  const sidebar = useSidebar();
  const pathname = usePathname();
  const appSlug = pathname.split("/")[1];
  // const {
  //   data: history,
  //   isFetching,
  //   error,
  // } = useQuery({
  //   queryKey: ["chat_history", appSlug],
  //   queryFn: () => getUserChats(appSlug),
  // });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (sidebar.isOpen) {
          sidebar.toggleSidebar();
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebar]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div
      className={cn("hidden md:block relative z-50 h-screen")}
      style={{
        transition: "width 300ms ease-in-out",
        width: sidebar.isOpen ? "16rem" : "4rem",
        padding: 0,
      }}
    >
      <SidebarToggle
        className={cn(
          "absolute top-3 z-20",
          sidebar.isOpen ? "right-2" : "right-4"
        )}
      />
      <div
        className={cn(
          "bg-background flex flex-col w-full h-full relative",
          sidebar.isOpen ? "p-6" : "p-3"
        )}
      >
        {/* Top section */}
        <div className="flex-shrink-0">{sidebar.isOpen && <Logo />}</div>
        {/* Middle section (chat history) */}
        <div className="flex-grow overflow-hidden mt-6">
          {sidebar.isOpen && (
            <div className="h-full overflow-y-auto">
              <ChatHistory chats={[]} isFetching={false} appName={appSlug} />
            </div>
          )}
        </div>

        {/* Bottom section (user profile) */}
        <div className="flex-shrink-0 mt-auto"></div>
      </div>
    </div>
  );
}
