import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { job_types } from "@/lib/constants/jobtypes";


export interface JobCardProps {
    title: string;
    slug: string;
    jobtype: "full_time" | "part_time" | "contract" | "intern";
    company: {
      name: string;
      logo: string;
    };
    canBeRemote: boolean;
    location: string;
    salary: string | null;
    createdAt: Date;
  }
  export const JobCard = (props: JobCardProps) => (
    <div className="group grid justify-between gap-x-4 gap-y-6 p-2 md:flex">
      <div className="flex gap-4">
        <Avatar className="h-14 w-14 border">
          <AvatarImage className="object-cover" src={props.company.logo} />
          <AvatarFallback>{props.company.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-[550]">{props.company.name}</span>
          <div className="flex flex-col">
            <Link
              href={`/jobs/${props.slug}`}
              className="text-lg font-semibold transition-colors hover:text-primary"
            >
              {props.title}
            </Link>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <Badge
                className="rounded-[5px] py-0.5 font-normal"
                variant={"outline"}
              >
                {job_types[props.jobtype]}
              </Badge>
              {props.salary && (
                <Badge
                  className="rounded-[5px] py-0.5 font-normal"
                  variant={"outline"}
                >
                  {props.salary}
                </Badge>
              )}
              {props.location && (
                <Badge
                  className="rounded-[5px] py-0.5 font-normal"
                  variant={"outline"}
                >
                  {props.location}
                </Badge>
              )}
              {props.canBeRemote && (
                <Badge
                  className="rounded-[5px] py-0.5 font-normal"
                  variant={"outline"}
                >
                  🌎 Remote
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          asChild
          className="flex rounded-full  md:hidden md:group-hover:flex"
        >
          <Link href={`/jobs/${props.slug}`}>
            Apply now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <span className="block italic text-muted-foreground md:group-hover:hidden">
          {/* 22d instead of 22 days  */}
          {formatDistance(props.createdAt, new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );