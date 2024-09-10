"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "@/actions/chat.history";
import { cn } from "@/lib/utils";
import Logo from "../header/logo";
import ChatHistory from "./chat-history";
import { Button } from "../ui/button";
import { Home, Menu, X } from "lucide-react";

export default function MobileNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const appSlug = pathname.split("/")[1];

  const { data: history, isFetching } = useQuery({
    queryKey: ["chat_history", appSlug],
    queryFn: () => getUserChats(appSlug),
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:hidden">
      <div className="w-full h-12 items-center flex justify-between z-50 bg-gradient-to-b from-[rgba(10,30,80,0.9)] text-muted-foreground to-transparent">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={() => router.push("/")}
        >
          <Home size={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Top section */}
          <div className="flex-shrink-0 flex justify-between items-center">
            <Logo />
            <Button
              variant="outline"
              size="icon"
              className="top-4 left-4 z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              <X size={24} />
            </Button>
          </div>

          {/* Middle section (chat history) */}
          <div className="flex-grow overflow-hidden mt-6">
            <div className="h-full overflow-y-auto">
              <ChatHistory
                chats={history?.data ?? []}
                isFetching={isFetching}
                appName={appSlug}
              />
            </div>
          </div>

          {/* Bottom section (user profile) */}
        </div>
      </div>
    </div>
  );
}
