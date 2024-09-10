"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen relative">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-muted bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(10,30,80,0.5),rgba(0,0,0,0))]" />
      <div className="text-4xl font-bold">Nothing here</div>
      <Link href="/app_name">
        <Button>Go to App</Button>
      </Link>
    </div>
  );
}
