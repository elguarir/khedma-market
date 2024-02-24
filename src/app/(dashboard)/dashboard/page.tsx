import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

type Props = {};

const DashboardPage = async (props: Props) => {
  let user = await getServerAuthSession();

  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Howdy, <span className="text-primary">{user?.user?.name}</span>!
        </h2>
        <p className="text-muted-foreground"></p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"></div>
    </main>
  );
};

export default DashboardPage;
