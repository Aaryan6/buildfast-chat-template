"use client";

import { PanelLeftOpen, PanelRightOpen, Settings2Icon } from "lucide-react";
import { Button } from "../ui/button";
import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function SidebarToggle({ className }: { className?: string }) {
  const sidebar = useSidebar();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={sidebar.toggleSidebar}
      className={cn("w-8 h-8 my-2", className)}
    >
      {sidebar.isOpen ? (
        <PanelRightOpen size={18} />
      ) : (
        <PanelLeftOpen size={18} />
      )}
    </Button>
  );
}
