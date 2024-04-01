import { Separator } from "@/components/ui/separator";
import React from "react";
import JobForm from "../_components/job-form";
import { getJobById } from "@/server/api/routers/job";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const EditJob = async (props: Props) => {
  let job = await getJobById(props.params.id);

  if (!job) {
    return redirect("/dashboard/jobs");
  }

  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Edit job posting</h2>
        <p className="text-muted-foreground">
          Edit in the details of the job, and save the changes.
        </p>
      </div>
      <Separator className="my-6" />
      <JobForm
        mode="edit"
        initialData={{
          title: job.title,
          jobType: job.type,
          canBeRemote: job.canBeRemote,
          location: job.location,
          description: job.description,
          salary: job.salary ?? undefined,
        }}
        id={job.id}
      />
    </main>
  );
};

export default EditJob;
