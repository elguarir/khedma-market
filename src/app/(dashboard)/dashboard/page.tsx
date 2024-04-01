import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import React from "react";
import MaxWidthWrapper from "./_components/max-width-wrapper";
import {DailyImpressions} from "./_components/dialy-impressions";

type Props = {};

const DashboardPage = async (props: Props) => {
  let user = await getServerAuthSession();

  return (
    <MaxWidthWrapper>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Howdy, <span className="text-primary">{user?.user?.name}</span>!
        </h2>
        <p className="text-muted-foreground"></p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="grid w-full md:grid-cols-2">
          <div>
            <DailyImpressions />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DashboardPage;
