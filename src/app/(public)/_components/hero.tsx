import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="bg-dot-primary-dark/[0.20] relative flex h-[28rem] lg:h-[36rem] w-full overflow-hidden rounded-xl bg-background/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight
        className="-top-20 left-0 md:-left-10 md:-top-20 lg:-top-40"
        fill="lime"
      />
      <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 gap-x-4 p-4 pt-20 md:pt-0 lg:grid-cols-2">
        <div className="flex flex-col lg:justify-center">
          <h1 className="to-primary-darker max-w-lg text-balance bg-opacity-50 bg-gradient-to-b from-primary bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-[80px]">
            Hire the right people
          </h1>
          <p className="mt-4 max-w-prose text-balance text-base font-normal text-neutral-600 dark:text-neutral-300">
            We help you find the right people for you next project, discover
            thousands of services and professionals.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Button asChild className="rounded-full">
              <Link href={"/auth/sign-up"}>Get Started</Link>
            </Button>
            <Button asChild variant={"ghost"} className="rounded-full">
              <Link href={"/about"}>Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="hidden w-full lg:block">
          <img src="/images/searching-talent.png" alt="" />
        </div>
      </div>
      {/* <div className="absolute z-10 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" /> */}
    </div>
  );
};

export default HeroSection;
