import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";
import JobsTable from "./_components/jobs-table";

type Props = {};

const JobsPage = (props: Props) => {
  return (
    <main>
      <div className="space-y-0.5">
        <div className="flex justify-between gap-2 max-sm:flex-col">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Jobs</h2>
            <p className="text-muted-foreground">
              Manage your job postings here
            </p>
          </div>
          <div className="flex items-center justify-end max-sm:w-full">
            <Button asChild>
              <Link href={"/dashboard/jobs/new"}>Create a new job</Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-6" />

      <div className="py-3">
        <JobsTable />
      </div>
    </main>
  );
};

export default JobsPage;
