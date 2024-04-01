import React from "react";
import {
  freelancerNavLinks,
  companyNavLinks,
} from "../../../../lib/constants/dashboard-links";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import { NavLink } from "./nav-link";
import { getServerAuthSession } from "@/server/auth";
type Props = {};

const MobileSidebar = async (props: Props) => {
  let session = await getServerAuthSession();
  let role = session?.user?.role;
  let links = role === "company" ? companyNavLinks : freelancerNavLinks;
  return (
    <div className="flex h-full w-full flex-col gap-2 py-6">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="#">
          <Icons.logo className="h-11 w-11" />
        </Link>
        <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </div>
      <div className="pt flex h-screen flex-1 flex-col justify-between overflow-auto">
        <nav className="items-star grid gap-2 text-sm font-medium">
          {links.map((link) => (
            <NavLink key={link.label} link={link} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
