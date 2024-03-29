import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { BellIcon } from "@radix-ui/react-icons";
import LogoutButton from "./logout-button";
import { NavLinkProps, freelancerNavLinks } from "./navlinks";
import { NavLink } from "./nav-link";

const SideBar = async () => {
  let session = await getServerAuthSession();
  

  return (
    <aside className="hidden h-screen flex-col border-r bg-neutral-100/40 dark:bg-neutral-800/40 lg:flex">
      <div className="flex h-full flex-col gap-2">
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
          <nav className="items-star grid gap-2 px-4 text-sm font-medium">
            {freelancerNavLinks.map((link) => (
              <NavLink key={link.label} link={link} />
            ))}
          </nav>

          <div className="grid text-sm font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="hidden w-full items-center justify-start gap-2 rounded-none border-t p-6 focus-visible:ring-0 lg:flex"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src={
                      session?.user.image
                        ? session?.user.image
                        : "/images/placeholder.png"
                    }
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                  <span>{session?.user.name}</span>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[265px]" align="center">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${session?.user.username}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <LogoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
