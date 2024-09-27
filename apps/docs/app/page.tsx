import { buttonVariants } from "@/components/ui/button";
import { GITHUB_REPO_URL } from "@/constants";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon, TerminalIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative h-[83vh] w-full">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-neutral-950/70 z-10" />
        <video autoPlay muted loop className="w-full h-full object-cover absolute top-0 left-0">
          <source src="/bg-video-output.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute top-0 left-0 right-0 w-[88vw] sm:container mx-auto flex min-h-[80vh] flex-col items-center justify-center text-center px-2 py-8">
        <Link
          href={GITHUB_REPO_URL}
          target="_blank"
          className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4"
        >
          Follow the project on GitHub{" "}
          <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
        </Link>
        <h1 className="text-3xl font-bold mb-4 sm:text-7xl">
          Arrow Navigation
        </h1>
        <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
          Light and zero-dependency library to navigate through elements using the arrow keys written in Typescript. Crafted for Tizen and WebOS Smart TV Apps.
        </p>
        <div className="flex flex-row items-center gap-5">
          <Link
            href={`/docs${page_routes[0].href}`}
            className={buttonVariants({ className: "px-6", size: "lg" })}
          >
            Get Started
          </Link>
          <Link
            href="/docs/core/api"
            className={buttonVariants({
              variant: "outline",
              className: "px-6",
              size: "lg",
            })}
          >
            API Reference
          </Link>
        </div>
        <span className="flex flex-row items-center gap-2 text-zinc-400 text-md mt-7 -mb-12 max-[800px]:mb-12">
          <TerminalIcon className="w-4 h-4 mr-1" /> ~ npm install @arrow-navigation/core
        </span>
      </div>
    </section>
  );
}
