import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNew from "./_components/add-new";
import GigsTable from "./_components/gigs-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GigStatus } from "@prisma/client";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { getUserGigsById } from "@/server/api/routers/gig";
import { RouterOutputs } from "@/trpc/shared";
import Link from "next/link";

interface GigsPageProps {
  searchParams: {
    filter?: "all" | "active" | "paused" | "draft";
  };
}

const GigsPage = async ({ searchParams }: GigsPageProps) => {
  let session = await getServerAuthSession();
  if (!session || !session.user) return redirect("/auth/sign-in");
  let gigs = await getUserGigsById(session.user.id);
  let filteredGigs = filterGigs(gigs, searchParams.filter);
  return (
    <main>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-2 max-sm:flex-col">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Gigs</h2>
            <p className="text-muted-foreground">
              bellow you can view, create and manage your gigs.
            </p>
          </div>
          <div className="flex items-center justify-end max-sm:w-full">
            <AddNew />
          </div>
        </div>
      </div>
      <Separator className="my-6" />
      <div className="py-3">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger asChild value="all">
              <Link href={"/dashboard/gigs"}>All</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="active">
              <Link href={`/dashboard/gigs?filter=active`}>Active</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="draft">
              <Link href={`/dashboard/gigs?filter=draft`}>Draft</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="paused">
              <Link href={`/dashboard/gigs?filter=paused`}>Paused</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <GigsTable initialData={filteredGigs} />
    </main>
  );
};

export default GigsPage;

let filterGigs = (
  gigs: RouterOutputs["gig"]["getUserGigs"],
  filter: GigsPageProps["searchParams"]["filter"],
) => {
  if (filter === "all" || !filter) return gigs;
  return gigs.filter((gig) => {
    if (filter === "active") return gig.status === GigStatus.published;
    if (filter === "paused") return gig.status === GigStatus.paused;
    if (filter === "draft") return gig.status === GigStatus.draft;
  });
};
