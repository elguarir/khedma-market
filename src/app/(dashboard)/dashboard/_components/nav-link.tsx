"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

export type NavLinkProps = linkProps | accordianProps;

interface linkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  type: "link";
}

interface accordianProps {
  label: string;
  icon?: React.ReactNode;
  type: "accordian";
  items?: { label: string; href: string }[];
}

export const NavLink = ({ link }: { link: NavLinkProps }) => {
  let pathname = usePathname();
  if (link.type === "accordian")
    return (
      <Accordion.Root type="single" collapsible className="font-medium">
        <Accordion.AccordionItem value={link.label}>
          <Accordion.Trigger
            className={cn(
              "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-neutral-900 data-[state=open]:text-green-700 dark:text-neutral-400 dark:hover:text-neutral-50 dark:data-[state=open]:text-green-700",
            )}
          >
            {link.icon && link.icon}
            {link.label}
            <div className="ml-auto">
              <ChevronDownIcon className="h-4 w-4 transition group-[[data-state=open]]:rotate-180" />
            </div>
          </Accordion.Trigger>
          <Accordion.Content className="grid w-full gap-1 pl-7">
            {link.items?.map((item) => {
              let itemActive = pathname === item.href;
              return (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 ",
                    itemActive && "bg-neutral-100 dark:bg-neutral-800",
                  )}
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </Accordion.Content>
        </Accordion.AccordionItem>
      </Accordion.Root>
    );
  let isActive = link.href === pathname;
  return (
    <Link
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50 ",
        isActive && "bg-neutral-100 dark:bg-neutral-800",
      )}
      href={link.href}
    >
      {link.icon && link.icon}
      {link.label}
    </Link>
  );
};
