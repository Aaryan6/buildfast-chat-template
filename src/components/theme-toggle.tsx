"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Moon size={18} className="transition-all dark:hidden" />
      <Sun size={18} className="transition-all hidden dark:inline-block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
