"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ExtendedUser } from "@/server/auth";
import { links } from "@/lib/constants/nav-links";

interface MobileNavProps {
  user?: ExtendedUser;
}

const MobileNav = ({ user }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [open]);

  return (
    <>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="rounded-full md:hidden"
        onClick={() => setOpen(!open)}
      >
        {!open ? (
          <HamburgerMenuIcon strokeWidth={2.75} className="h-5 w-5" />
        ) : (
          <Cross2Icon strokeWidth={2.75} className="h-5 w-5" />
        )}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="fixed right-0 top-16 z-30 mx-auto h-full w-full bg-background p-0 py-2 transition-[background-color] duration-200 md:hidden"
          >
            <ul className="grid divide-y divide-muted px-7 dark:divide-muted/40">
              {links.map((link) => (
                <li className="py-3">
                  <Link
                    onClick={() => setOpen(false)}
                    className="flex w-full font-semibold capitalize"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {user ? (
                <div className="grid w-full py-4">
                  <li>
                    <Button
                      onClick={() => setOpen(false)}
                      className="flex w-full font-semibold capitalize"
                      asChild
                    >
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                  </li>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 py-4">
                  <li>
                    <Button
                      onClick={() => setOpen(false)}
                      className="flex w-full font-semibold capitalize"
                      asChild
                    >
                      <Link href={"/auth/sign-up"}>Sign Up</Link>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={() => setOpen(false)}
                      className="flex w-full font-semibold capitalize"
                      asChild
                      variant={"outline"}
                    >
                      <Link href={"/auth/sign-in"}>Sign In</Link>
                    </Button>
                  </li>
                </div>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
