import { Separator } from "@/components/ui/separator";
import React from "react";
import AddNew from "./_components/add-new";

const GigsPage = async () => {
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
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0"></div>
    </main>
  );
};

export default GigsPage;
