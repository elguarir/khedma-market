import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cities } from "@/lib/constants/cities";
import { getJobApplications } from "@/server/api/routers/job";
import { MapPin } from "lucide-react";
import React from "react";

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

      <div className="grid grid-cols-3 gap-4">
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
              <div>
                <h3 className="text-lg font-semibold leading-none tracking-tight">
                  {application.applicant.firstName}{" "}
                  {application.applicant.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {application.applicant.email}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <p className="font-semibold">City: </p>
                <p>
                  {
                    cities.find(
                      (city) => city.value === application.applicant.city,
                    )?.label
                  }
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-semibold">Cover Letter:</p>
                <p>{application.coverLetter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default JobApplications;
