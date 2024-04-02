import { getUserJobs } from "@/server/api/routers/job";
import React from "react";
import {
  ClockIcon,
  DotsVerticalIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DollarSign, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {};

const JobsTable = async (props: Props) => {
  let jobs = await getUserJobs();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {jobs.map((job) => {
        return (
          <div className="w-full space-y-4 rounded-xl border bg-card p-6 pb-4 text-card-foreground shadow">
            <div>
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                {job.title}
              </h3>
            </div>
            <div>
              <div className="grid w-full gap-y-1 text-neutral-700 dark:text-neutral-200">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <p>{format(job.createdAt, "dd MMMM, yyyy")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p>
                    {job.location}
                    {job.canBeRemote && " / 🌍 Remote"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <p>{job.salary}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                      <DotsVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="top"
                    className="w-40 max-w-full"
                  >
                    <DropdownMenuItem asChild>
                      <a
                        href={`/jobs/${job.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 justify-between"
                      >
                        View
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/jobs/${job.id}`}>Edit</Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="transition-colors duration-300 focus:bg-destructive focus:text-destructive-foreground">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant={"outline"}
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={`/dashboard/jobs/${job.id}/applications`}>
                    Applications
                    <Badge
                      variant={"success"}
                      className="flex h-5 w-5 items-center justify-center rounded-full px-0.5 py-0.5 text-xs"
                    >
                      {job.applications.length}
                    </Badge>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default JobsTable;
