import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cities } from "@/lib/constants/cities";
import { getJobApplications } from "@/server/api/routers/job";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { MapPin, File, Mail, FileQuestion } from "lucide-react";
import Link from "next/link";
import React from "react";
import CopyEmail from "../../_components/copy-email";
import { format } from "date-fns";

type Props = {
  params: {
    id: string;
  };
};

const JobApplications = async (props: Props) => {
  let applications = await getJobApplications(props.params.id);

  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Applications{" "}
          {applications[0]?.job.title && `- ${applications[0]?.job.title}`}
        </h2>
        <p className="text-muted-foreground">
          Bellow are the applications for the job posting, you can view the
          details of the applicant and their details.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="mb-4">
        <Button
          variant={"link"}
          asChild
          className="flex w-fit items-center font-semibold"
        >
          <Link href={"/dashboard/jobs"}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((application) => (
          <div className="w-full space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14">
                <AvatarImage src={application.applicant?.profilePic ?? ""} />
                <AvatarFallback>
                  {application.applicant.firstName?.charAt(0)}
                  {application.applicant.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex w-full flex-1 items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">
                    {application.applicant.firstName}{" "}
                    {application.applicant.lastName}
                  </h3>
                  <CopyEmail email={application.applicant.email!} />
                </div>
                <p className="font-[450] italic">
                  {format(new Date(application.createdAt), "dd/MM")}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">City: </p>
                <p className="font-[450]">
                  {
                    cities.find(
                      (city) => city.value === application.applicant.city,
                    )?.label
                  }
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">Phone: </p>
                <a
                  href={`tel:${application.applicant.phone}`}
                  className="font-[450] text-primary"
                >
                  {application.applicant.phone}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">Cover Letter:</p>
                <p className="font-[450]">{application.coverLetter}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div>
                  {application.applicant.resume && (
                    <Button
                      variant={"outline"}
                      asChild
                      className="flex items-center gap-2"
                    >
                      <a href={application.applicant.resume} target="_blank">
                        <File className="h-4 w-4" />
                        <span className="font-semibold">Resume</span>
                      </a>
                    </Button>
                  )}
                </div>
                <div>
                  <Button asChild className="flex items-center gap-2">
                    <a
                      href={`mailto:${application.applicant.email}`}
                      target="_blank"
                    >
                      <Mail className="h-4 w-4" />
                      <span className="font-semibold">Contact</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="flex min-h-64 w-full flex-col items-center justify-center space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
            <FileQuestion className="h-20 w-20 text-primary" />
            <div className="space-y-1 text-center">
              <h3 className="text-lg font-semibold leading-none tracking-tight">
                No applications yet
              </h3>
              <p className="text-muted-foreground">
                No one has applied for this job yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default JobApplications;
