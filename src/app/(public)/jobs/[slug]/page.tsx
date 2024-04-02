import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CheckCheck, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { JobCard, JobCardProps } from "../_components/job-card";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { OutputData } from "@editorjs/editorjs";
import { BlockRenderer } from "@/components/block-renderer";
import { ApplyButton } from "../_components/apply-button";
import { getServerAuthSession } from "@/server/auth";
import Callout from "@/components/ui/callout";

type Props = {
  params: {
    slug: string;
  };
};

const JobPage = async (props: Props) => {
  // let job = {
  //   title: "UI/UX Designer",
  //   slug: "ui-ux-designer",
  //   jobtype: "contract",
  //   company: {
  //     name: "OCP Group",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/OCP_Group.svg/1200px-OCP_Group.svg.png",
  //     website: "https://ocp-group.ma",
  //   },
  //   canBeRemote: true,
  //   location: "Marrakech",
  //   salary: "5,000 MAD - 7,000 MAD",
  //   createdAt: new Date("2024-03-23"),
  // };

  // let relatedJobs = [
  //   {
  //     title: "Data Scientist",
  //     slug: "data-scientist",
  //     jobtype: "part_time",
  //     company: {
  //       name: "Royal Air Maroc",
  //       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_Royal_Air_Maroc.svg/1024px-Logo_Royal_Air_Maroc.svg.png",
  //     },
  //     canBeRemote: true,
  //     location: "Casablanca",
  //     salary: "8,000 MAD - 10,000 MAD",
  //     createdAt: new Date("2024-03-21"),
  //   },
  //   {
  //     title: "Software Engineer",
  //     slug: "software-engineer",
  //     jobtype: "full_time",
  //     company: {
  //       name: "Addoha Group",
  //       logo: "https://ir.groupeaddoha.com/images/5dde9ef08336a.png",
  //     },
  //     canBeRemote: false,
  //     location: "Casablanca",
  //     salary: "25,000 MAD - 35,000 MAD",
  //     createdAt: new Date("2024-03-25"),
  //   },
  // ] as JobCardProps[];
  let res = await getJobBySlug(props.params.slug);
  if (!res || !res.job) {
    return notFound();
  }
  let session = await getServerAuthSession();

  let hasAlreadyApplied = res.job.applications.find(
    (app) => app.userId === session?.user?.id,
  );

  return (
    <main className="flex w-full flex-col py-16">
      <div className="flex w-full flex-col gap-1 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button
            asChild
            variant={"link"}
            className="px-0.5 text-base font-semibold hover:no-underline"
          >
            <Link href={"/jobs"}>
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              All Jobs
            </Link>
          </Button>
        </div>
        <div className="grid w-full grid-cols-12 gap-8 ">
          {/* job details */}
          <div className="col-span-12 w-full max-md:order-2 md:col-span-7 lg:col-span-8 xl:col-span-9">
            <div className="flex flex-col space-y-2">
              <h1 className="mb-8 max-w-prose text-balance text-3xl font-bold md:text-4xl">
                {res.job.title}
              </h1>
              <div className="prose prose-lime flex flex-col dark:prose-invert prose-p:my-1.5">
                {(res.job.description as OutputData | null)?.blocks.map(
                  (block) => <BlockRenderer key={block.id} block={block} />,
                )}
              </div>
              <div className="flex items-center justify-end gap-5">
                <span className="font-medium text-primary-light">
                  Share job
                </span>
                <div className="flex items-center gap-2">
                  <Button variant={"secondary"} size={"icon"} asChild>
                    <Link href={"https://www.twitter.com"}>
                      <svg
                        viewBox="0 0 32 32"
                        className="h-8 w-8 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z"></path>
                      </svg>
                    </Link>
                  </Button>
                  <Button variant={"secondary"} size={"icon"} asChild>
                    <Link href={"https://www.twitter.com"}>
                      <svg
                        className="h-8 w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M14.023 24 14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257Z" />
                      </svg>
                    </Link>
                  </Button>
                  <Button variant={"secondary"} size={"icon"} asChild>
                    <Link href={"https://www.facebook.com"}>
                      <svg
                        className="h-8 w-8 fill-current"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
                      </svg>
                    </Link>
                  </Button>
                </div>
              </div>
              {res.related.length > 0 && (
                <div className="flex flex-col space-y-4">
                  <h3 className="text-lg font-bold">Related Jobs</h3>
                  <Separator />
                  <div className="flex flex-col divide-y py-6">
                    {res.related.map((job) => (
                      <div className="py-3">
                        <JobCard key={job.slug} {...job} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* company card */}
          <div className="col-span-12 w-full max-md:order-1 md:col-span-5 lg:col-span-4 xl:col-span-3">
            <div className="flex w-full flex-col items-center space-y-8 rounded-md border bg-neutral-100/80 px-6 py-8 dark:bg-neutral-800/40">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-[4.8rem] w-[4.8rem] border">
                  <AvatarImage
                    className="object-cover"
                    src={res.job.company.logo}
                  />
                  <AvatarFallback>{res.job.company.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center space-y-2">
                  <h3 className="text-lg font-bold">{res.job.company.name}</h3>
                </div>
              </div>
              <div className="grid w-full gap-y-1 text-neutral-700 dark:text-neutral-200">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <p>{format(res.job.createdAt, "dd MMMM, yyyy")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p>
                    {res.job.location} /{" "}
                    {res.job.canBeRemote && "Remote friendly"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <p>{res.job.salary}</p>
                </div>
              </div>

              <div className="grid w-full gap-y-1">
                {hasAlreadyApplied ? (
                  <Callout
                    variant={"success"}
                    className="flex items-center gap-2"
                  >
                    <CheckCheck className="h-5 w-5" />
                    You have already applied to this job
                  </Callout>
                ) : !session || !session.user ? (
                  <Button asChild>
                    <Link href={"/auth/sign-in"}>Sign in to apply</Link>
                  </Button>
                ) : session.user.role !== "freelancer" ? (
                  <Callout variant={"info"} className="flex items-center gap-2">
                    <InfoCircledIcon className="h-5 w-5" />
                    You need to setup a freelancer profile to apply.
                  </Callout>
                ) : (
                  <ApplyButton slug={res.job.slug} />
                )}
                {res.job.company.website && (
                  <Button variant={"link"} className="w-full" size={"icon"}>
                    <Link href={res.job.company.website}>Visit Website</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobPage;

async function getJobBySlug(slug: string | undefined) {
  let job = await db.job.findUnique({
    where: { slug: slug },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      description: true,
      canBeRemote: true,
      location: true,
      salary: true,
      createdAt: true,
      company: true,
      applications: {
        select: {
          userId: true,
        },
      },
    },
  });
  if (!job) return null;

  let relatedJobs = await db.job.findMany({
    where: {
      OR: [
        {
          title: {
            contains: job.title,
          },
        },
        {
          company: {
            name: {
              contains: job.company.name,
            },
          },
        },
        {
          location: {
            contains: job.location,
          },
        },
      ],
      NOT: {
        slug: job.slug,
      },
    },
    include: {
      company: true,
    },
    take: 3,
  });

  return {
    job: {
      title: job.title,
      slug: job.slug,
      jobtype: job.type,
      applications: job.applications,
      company: {
        name: job.company.name,
        logo: job.company.logo,
        website: job.company.website,
      },
      description: job.description,
      canBeRemote: job.canBeRemote,
      location: job.location,
      salary: job.salary,
      createdAt: job.createdAt,
    },
    related: relatedJobs.map((job) => ({
      title: job.title,
      slug: job.slug,
      jobtype: job.type,
      company: {
        name: job.company.name,
        logo: job.company.logo,
      },
      description: job.description,
      canBeRemote: job.canBeRemote,
      location: job.location,
      salary: job.salary,
      createdAt: job.createdAt,
    })),
  };
}
