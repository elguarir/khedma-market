import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { Icons } from "./icons";

const NavBar = async () => {
  let session = await getServerAuthSession();
  return (
    <div className="border-b">
      <nav className="container py-2.5 max-md:px-6">
        <div className="flex h-12 w-full items-center justify-between">
          <div className="flex items-center justify-between max-md:w-full">
            <Link className="w-36 md:w-40" href={"/"}>
              <Icons.logo className="w-16" />
            </Link>

            <MobileNav user={session?.user} />
          </div>
          {/* Desktop */}
          <ul className="hidden h-full flex-1 items-center justify-center gap-6 md:flex">
            <li className="text-base font-medium transition-colors duration-300 hover:text-[#657dcc]">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="text-base font-medium transition-colors duration-300 hover:text-[#657dcc]">
              <Link href={"/articles"}>Articles</Link>
            </li>
            <li className="text-base font-medium transition-colors duration-300 hover:text-[#657dcc]">
              <Link href={"/events"}>Events</Link>
            </li>
            <li className="text-base font-medium transition-colors duration-300 hover:text-[#657dcc]">
              <Link href={"/about"}>About</Link>
            </li>

            <li className="text-base font-medium transition-colors duration-300 hover:text-[#657dcc]">
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Separator orientation={"vertical"} className="h-5" />

            {session?.user ? (
              <Button asChild size={"sm"} className="">
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size={"sm"} variant={"outline"} className="">
                  <Link href={"/auth/sign-in"}>Sign In</Link>
                </Button>
                <Button asChild size={"sm"} className="">
                  <Link href={"/auth/sign-up"}>Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
