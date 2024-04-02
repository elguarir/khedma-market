import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { Suspense } from "react";
import { JobCardProps } from "./_components/job-card";
import { db } from "@/server/db";
import { FiltersSidebar } from "./_components/filters-sidebar";
import { JobsTable } from "./_components/jobs-table";
import { Await } from "@/lib/helpers/Await";

type Props = {
  searchParams: {
    q: string | undefined;
  };
};

const JobsPage = async (props: Props) => {
  let jobs = [
    // {
    //   title: "Software Engineer Backend",
    //   company: {
    //     logo: "https://preview.cruip.com/job-board/images/company-icon-02.svg",
    //     name: "Vimeo",
    //   },
    //   createdAt: new Date("2024-03-29T00:00:00Z"),
    //   jobtype: "full_time",
    //   location: "Agadir, Morocco",
    //   canBeRemote: true,
    //   salary: "5000 MAD+",
    //   slug: "software-engineer-backend-" + nanoid(4).toLowerCase(),
    // },
    {
      title: "Senior Software Engineer",
      slug: "senior-software-engineer",
      jobtype: "full_time",
      company: {
        name: "Maroc Telecom",
        logo: "https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-bleu-fr-grande.jpg",
      },
      canBeRemote: false,
      location: "Casablanca",
      salary: "7,000 MAD - 9,000 MAD",
      createdAt: new Date("2024-03-27"),
    },
    {
      title: "Marketing Manager",
      slug: "marketing-manager",
      jobtype: "full_time",
      company: {
        name: "Attijariwafa Bank",
        logo: "https://upload.wikimedia.org/wikipedia/ar/archive/b/bb/20081009234226%21Attijariwafa_bank_logo.png",
      },
      canBeRemote: false,
      location: "Rabat",
      salary: "6,000 MAD - 8,000 MAD",
      createdAt: new Date("2024-03-25"),
    },
    {
      title: "UI/UX Designer",
      slug: "ui-ux-designer",
      jobtype: "contract",
      company: {
        name: "OCP Group",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/OCP_Group.svg/1200px-OCP_Group.svg.png",
      },
      canBeRemote: true,
      location: "Marrakech",
      salary: "5,000 MAD - 7,000 MAD",
      createdAt: new Date("2024-03-23"),
    },
    {
      title: "Data Scientist",
      slug: "data-scientist",
      jobtype: "part_time",
      company: {
        name: "Royal Air Maroc",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_Royal_Air_Maroc.svg/1024px-Logo_Royal_Air_Maroc.svg.png",
      },
      canBeRemote: true,
      location: "Casablanca",
      salary: "8,000 MAD - 10,000 MAD",
      createdAt: new Date("2024-03-21"),
    },
    {
      title: "Software Engineer",
      slug: "software-engineer",
      jobtype: "full_time",
      company: {
        name: "Addoha Group",
        logo: "https://ir.groupeaddoha.com/images/5dde9ef08336a.png",
      },
      canBeRemote: false,
      location: "Casablanca",
      salary: "25,000 MAD - 35,000 MAD",
      createdAt: new Date("2024-03-25"),
    },
    {
      title: "HR Manager",
      slug: "hr-manager",
      jobtype: "full_time",
      company: {
        name: "BMCE Bank",
        logo: "https://i.pinimg.com/originals/06/1d/59/061d59e0fdfda579d9fa9be0223ddf2e.png",
      },
      canBeRemote: false,
      location: "Marrakech",
      salary: "28,000 MAD - 38,000 MAD",
      createdAt: new Date("2024-03-23"),
    },
    {
      title: "Mechanical Engineer",
      slug: "mechanical-engineer",
      jobtype: "contract",
      company: {
        name: "Managem Group",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXPkYJA-upPqZAVneR4ErqkR_st2ftMeM0c8dZQR2uVA&s",
      },
      canBeRemote: true,
      location: "El Jadida",
      salary: "20,000 MAD - 30,000 MAD",
      createdAt: new Date("2024-03-21"),
    },
    {
      title: "UX/UI Designer",
      slug: "ux-ui-designer",
      jobtype: "part_time",
      company: {
        name: "Société Générale Maroc",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyXNB-voSx7l2fAsUcf5aNmOEYbpWybjd2SVA_2yBhSg&s",
      },
      canBeRemote: true,
      location: "Tangier",
      salary: "22,000 MAD - 32,000 MAD",
      createdAt: new Date("2024-03-19"),
    },
  ] as JobCardProps[];

  let dbJobs = getPostedJobs({ query: props.searchParams.q });
  return (
    <main className="flex w-full flex-col">
      <div className="grid min-h-[23rem] w-full grid-cols-12 rounded-md bg-lime-900/10 text-lime-950 dark:text-lime-50 ">
        <div className="col-span-12 flex flex-col justify-center space-y-6 p-8 md:col-span-8 lg:col-span-6">
          <h1 className="text-balance bg-gradient-to-br from-lime-700 to-lime-800 bg-clip-text text-5xl font-bold tracking-[-0.01em] text-transparent">
            Find your perfect job today
          </h1>

          <p className="text-sm font-[450] lg:text-base">
            Start your journey with us. Explore thousands of jobs from top
            companies worldwide, and find the one that's right for you.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={"/auth/sign-up"}>Post a job</Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex items-center -space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="./images/avatar-01.jpg"
                  alt="Avatar 01"
                />
                <img
                  className="h-8 w-8 rounded-full"
                  src="./images/avatar-02.jpg"
                  alt="Avatar 02"
                />
                <img
                  className="h-8 w-8 rounded-full"
                  src="./images/avatar-03.jpg"
                  alt="Avatar 03"
                />
                <img
                  className="h-8 w-8 rounded-full"
                  src="./images/avatar-04.jpg"
                  alt="Avatar 04"
                />
              </div>
              <div className="text-sm font-medium">
                Reach <span className="font-[550] text-primary">5K+</span>{" "}
                Prefessionals
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 hidden p-6 py-10 md:col-span-4 md:block lg:col-span-6">
          <div className="flex w-full flex-col items-center">
            <img
              src="/images/jobs-illustration.svg"
              alt=""
              className="max-h-[20rem] w-full object-contain"
            />
          </div>
        </div>
      </div>
      <div className="mt-16 flex items-center gap-8 border-b pb-4">
        <div className="font-heading text-lg font-semibold">Trusted by</div>
        <div className="flex items-center gap-6">
          <img
            className="h-8 grayscale transition duration-300 hover:grayscale-0"
            src="/images/iam.svg"
            alt="iam logo"
          />
          <img
            className="h-8 grayscale transition duration-300 hover:grayscale-0"
            src="/images/orange.png"
            alt="orange logo"
          />
          <img
            className="h-8 grayscale transition duration-300 hover:grayscale-0"
            src="/images/ocp.png"
            alt="ocp logo"
          />
        </div>
      </div>
      <div className="mt-16 grid w-full grid-cols-12 gap-8 md:mt-20">
        {/* jobs */}
        <div className="col-span-12 w-full md:col-span-6 lg:col-span-9">
          <div className="flex flex-col space-y-8">
            <h3 className="text-2xl font-semibold text-lime-900 dark:text-lime-50">
              Latest jobs
            </h3>
            <Suspense fallback="Loading...">
              <Await promise={dbJobs}>
                {(jobs) => <JobsTable jobs={jobs} />}
              </Await>
            </Suspense>
          </div>
        </div>
        {/* filters sidebar */}
        <div className="hidden w-full md:col-span-6 md:block lg:col-span-3">
          <FiltersSidebar />
        </div>
      </div>
    </main>
  );
};

export default JobsPage;

async function getPostedJobs({ query }: { query: string | undefined }) {
  let jobs = await db.job.findMany({
    include: {
      company: true,
    },
    where: {
      OR: [
        {
          title: {
            contains: query,
          },
        },
        {
          company: {
            name: {
              contains: query,
            },
          },
        },
      ],
    },
  });

  return jobs.map((job) => ({
    title: job.title,
    slug: job.slug,
    jobtype: job.type,
    company: {
      name: job.company.name,
      logo: job.company.logo,
    },
    canBeRemote: job.canBeRemote,
    location: job.location,
    salary: job.salary,
    createdAt: job.createdAt,
  }));
}
