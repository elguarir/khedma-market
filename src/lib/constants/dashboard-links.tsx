import { Icons } from "@/components/icons";
import { CaretSortIcon } from "@radix-ui/react-icons";
export type NavLinkProps = linkProps | accordianProps;

export interface linkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  type: "link";
}

export interface accordianProps {
  label: string;
  icon?: React.ReactNode;
  type: "accordian";
  items?: { label: string; href: string }[];
}

export const freelancerNavLinks: NavLinkProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Icons.dashboardIcon className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Work",
    icon: <Icons.workIcon className="h-5 w-5" />,
    type: "accordian",
    items: [
      { label: "Gigs", href: "/dashboard/gigs" },
      { label: "Portfolio", href: "/dashboard/portfolio" },
    ],
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: <Icons.basket className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Earnings",
    href: "/dashboard/earnings",
    icon: <Icons.earningsIcon className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Inbox",
    href: "/dashboard/inbox",
    icon: <Icons.inboxIcon className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Icons.SettingsIcon className="h-5 w-5" />,
    type: "link",
  },
];

export const companyNavLinks: NavLinkProps[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Icons.dashboardIcon className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Jobs",
    href: "/dashboard/jobs",
    icon: <Icons.briefcase className="h-5 w-5" />,
    type: "link",
  },

  {
    label: "Inbox",
    href: "/dashboard/inbox",
    icon: <Icons.inboxIcon className="h-5 w-5" />,
    type: "link",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Icons.SettingsIcon className="h-5 w-5" />,
    type: "link",
  },
];
