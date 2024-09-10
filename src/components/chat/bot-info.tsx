"use client";

import { Card, CardHeader } from "../ui/card";
import Image from "next/image";
import { BotIcon, PlusCircle } from "lucide-react";
import { cn, nanoid } from "@/lib/utils";
import Link from "next/link";

type Props = {
  image?: string;
  name: string;
  slug?: string;
  zoom?: boolean;
};

export default function AppInfo({ image, name, slug, zoom = true }: Props) {
  const id = nanoid();
  return (
    <Card className="border-none bg-transparent z-30">
      <CardHeader className="flex flex-row justify-between items-center px-0 space-y-0">
        <div className="flex items-center justify-between gap-4">
          <div className="bg-background border overflow-hidden w-12 h-12 rounded-full grid place-items-center">
            {image ? (
              <div className="w-full h-full overflow-hidden rounded-full relative">
                <Image
                  src={image}
                  alt="Bot Image"
                  className={cn(
                    "absolute object-cover object-center",
                    zoom ? "w-[180%] h-[180%]" : "w-full h-full"
                  )}
                  width={150}
                  height={150}
                  style={{
                    top: zoom ? "80%" : "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            ) : (
              <BotIcon size={18} className="" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">{name}</h2>
          </div>
        </div>
        <Link href={`/${slug}/chat/${id}`} className="">
          <PlusCircle className="text-muted-foreground" />
        </Link>
      </CardHeader>
    </Card>
  );
}
