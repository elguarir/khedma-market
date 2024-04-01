import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";
import { Separator } from "./ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { Icons } from "./icons";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { links } from "@/lib/constants/nav-links";

const NavBar = async () => {
  let session = await getServerAuthSession();
  // a freelancing platform like fiverr, upwork, etc
  
  return (
    <div className="border-b">
      <nav className="container py-2.5 max-md:px-6">
        <div className="flex h-10 w-full items-center justify-between">
          <div className="flex items-center justify-between max-md:w-full">
            <Link className="w-36 md:w-40" href={"/"}>
              <Icons.logo className="w-16" />
            </Link>
            {/* Mobile */}
            <MobileNav user={session?.user} />
          </div>
          {/* Desktop */}
          <ul className="hidden h-full flex-1 items-center justify-start gap-6 md:flex">
            {links.map((link) => (
              <li
                key={link?.href}
                className="text-base font-medium transition-colors duration-300 hover:text-primary"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden h-full items-center gap-4 md:flex">
            <div className="relative flex h-full flex-1 max-w-72 items-center py-0.5">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transform">
                <Search className="h-4 w-4" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="h-full w-full rounded-full border border-border pl-9"
              />
            </div>
            <Separator orientation={"vertical"} className="h-5" />
            <div className="flex items-center gap-2">
              {session?.user ? (
                <Button asChild>
                  <Link href={"/dashboard"}>Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant={"outline"}>
                    <Link href={"/auth/sign-in"}>Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href={"/auth/sign-up"}>Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
