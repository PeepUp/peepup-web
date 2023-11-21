"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Image } from "@nextui-org/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full w-full overflow-x-hidden">
      <div className={cn("h-full", "flex justify-center items-center gap-2")}>
        <Image
          src="https://app.requestly.io/delay/1000/http://localhost:3000/assets/images/left-bg-peepup-home.png"
          alt="PeepUp"
          loading="lazy"
          isZoomed
          draggable={false}
        />
        <div className="flex flex-col items-center min-w-[200px] max-w-full">
          <h1
            className={cn(
              "font-randrake text-[12rem] max-lg:text-[8rem] max-md:text-[4.4rem] max-sm:text-[4rem] min-w-max",
              "text-center",
              "select-none",
            )}
          >
            {siteConfig.name}
          </h1>
          <p
            className={cn(
              "font-mono font-medium -mt-5 text-center text-[12px] max-md:text-[7px] max-sm:hidden min-w-max",
            )}
          >
            <i>{"Inspiration starts here, words take flight."}</i>
          </p>
        </div>
        <Image
          src="https://app.requestly.io/delay/1000/http://localhost:3000/assets/images/right-bg-peepup-home.png"
          alt="PeepUp"
          isZoomed
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          loading="lazy"
        />
      </div>
    </section>
  );
}
