"use client";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { JobCard, JobCardProps } from "./job-card";
import { useFilters } from "./utils";

interface JobsTableProps {
  jobs: JobCardProps[];
}
export function JobsTable({ jobs }: JobsTableProps) {
  let filters = useFilters((state) => state.filters);
  let filteredJobs = jobs.filter((job) => {
    let jobtype =
      filters.jobtype.length === 0 || filters.jobtype.includes(job.jobtype);
    let remote = !filters.remote || job.canBeRemote;
    let city =
      filters.city === "" ||
      job.location.toLowerCase().includes(filters.city.toLowerCase());

    return jobtype && remote && city;
  });
  return (
    <div className="flex flex-col divide-y">
      {filteredJobs
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((job) => (
          <div className="py-5">
            <JobCard key={job.title} {...job} />
          </div>
        ))}

      {filteredJobs.length === 0 && (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-2">
          <QuestionMarkCircledIcon className="h-10 w-10 text-muted-foreground" />
          <p className="w-full text-center text-lg font-semibold">
            No jobs found
          </p>
        </div>
      )}
    </div>
  );
}
