import { Separator } from "@/components/ui/separator";
import React from "react";
import JobForm from "../_components/job-form";

type Props = {};

const NewJob = (props: Props) => {
  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">New job posting</h2>
        <p className="text-muted-foreground">
          Fill in the details of the job you want to post, and we'll take care
          of the rest.
        </p>
      </div>
      <Separator className="my-6" />
      <JobForm />
    </main>
  );
};

export default NewJob;
