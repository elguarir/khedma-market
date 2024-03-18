import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { RouterOutputs } from "@/trpc/shared";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import GigActions from "./gig-actions";

type Props = {
  initialData?: RouterOutputs["gig"]["getUserGigs"];
};

const GigsTable = ({ initialData }: Props) => {
  let formattedgigs = formatGigs(initialData ?? []);
  return (
    <div className="w-full">
      <ScrollArea className="max-w-full max-sm:w-[calc(100vw-50px)] max-sm:pb-3">
        <Table className="rounded-lg">
          <TableCaption>
            <div className="flex items-center justify-start">
              {/* Total Gigs: {formattedgigs.length} */}
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="max-sm:min-w-[450px] sm:w-[550px]">
                GIG
              </TableHead>
              <TableHead>IMPRESSIONS</TableHead>
              <TableHead>ORDERS</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formattedgigs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex items-center h-40 justify-center space-x-2">
                    <QuestionMarkCircledIcon className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">No gigs found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {formattedgigs.map((gig, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    {gig.image ? (
                      <img
                        src={gig.image}
                        alt="gig image"
                        className="aspect-video h-14 rounded-[5px]"
                      />
                    ) : (
                      <div className="flex aspect-video h-14 items-center justify-center rounded-[5px] bg-muted">
                        <QuestionMarkCircledIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/dashboard/gigs/${gig.id}`}
                        className="line-clamp-2 text-sm font-medium leading-tight transition-colors hover:text-primary"
                      >
                        {gig.title}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{gig.impressions}</p>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{gig.orders}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={gig.status === "published" ? "default" : "outline"}
                  >
                    {
                      {
                        published: "Published",
                        draft: "Draft",
                        paused: "Paused",
                        deleted: "Deleted",
                      }[gig.status]
                    }
                  </Badge>
                </TableCell>
                <TableCell>
                  <GigActions gig={gig} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default GigsTable;

export type TFormmatedGigs = ReturnType<typeof formatGigs>;
let formatGigs = (gigs: RouterOutputs["gig"]["getUserGigs"]) => {
  let formattedGigs = gigs.map((gig) => ({
    id: gig.id,
    slug: gig.slug,
    owner: gig.owner,
    image: gig.attachaments.images[0]?.url ?? undefined,
    title: gig.title ?? "Untitled",
    impressions: 40, // TODO: get impressions
    status: gig.status,
    orders: 15, // TODO: get orders
  }));
  return formattedGigs;
};
