"use client";

import Image from "next/image";
import LightLogo from "@/public/logo/light.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image
          src={LightLogo}
          alt="buildfastwithai"
          className="h-10 w-auto md:h-[2.2rem]"
        />
      </div>
    </Link>
  );
}
