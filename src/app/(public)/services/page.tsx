import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import { CategoryCardProps } from "./_components/category-card";
import PopularCategories from "./_components/popular-categories";
import { ServiceCard, ServiceCardProps } from "./_components/service-card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { db } from "@/server/db";
type Props = {};

const ServicesPage = async (props: Props) => {
  let categories = [
    {
      title: "WordPress Development",
      href: "/services/wordpress-development",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/wordpress.jpg",
    },
    {
      title: "Logo Design",
      href: "/services/logo-branding",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/logo-design.jpg",
    },
    {
      title: "Video Editing",
      href: "/services/editing-post-production",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/video-editing.jpg",
    },
    {
      title: "Data Science & ML",
      href: "/services/data-science-ml",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/data-analysis-reports.jpg",
    },
    {
      title: "Legal Services",
      href: "/services/legal-services",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/legal-writing.jpg",
    },
    {
      title: "Editing & Proofreading",
      href: "/services/editing-proofreading",
      image:
        "https://res.cloudinary.com/upwork-cloud/image/upload/catalog-ui-assets/taxonomy/category/proofreading-editing.jpg",
    },
  ] as CategoryCardProps[];
  let services = [
    {
      author: {
        avatar:
          "https://fiverr-res.cloudinary.com/attachments/profile/photo/06a3d2ab90dbd3cb729930b1ba5acbaa-991539391674554543481/JPEG_20230124_153222_2646298220152317127.jpg",
        id: "1",
        name: "Darshan",
        username: "darshan",
      },
      service: {
        id: "1",
        title:
          "I will build, rebuild, redesign wordpress website or wordpress elementor website design",
        createdAt: "2021-09-01T00:00:00.000Z",
        price: 50.5,
        images: [
          "https://fiverr-res.cloudinary.com/gigs/189055476/original/5b809b0a85e30a57c311470a7aabaaa086d579cf.jpg",
          "https://fiverr-res.cloudinary.com/gigs2/189055476/original/98ff0fbb6b0a57f612b64cf6f4ef3059c0c351db.jpg",
        ],
      },
      numberOfReviews: 1250,
      rating: 4.2,
    },
  ] as ServiceCardProps[];

  let dbServices = await getManyServices()
  console.log("dbservices", dbServices)
  return (
    <main className="flex w-full flex-col py-10">
      <section className="grid grid-cols-12 rounded-lg bg-lime-900 bg-no-repeat text-lime-50 [background-position:100%] [background-size:contain] lg:bg-[url('https://www.upwork.com/static/assets/CatalogApp/img/desktop@1x.eb9fc13.png')]">
        <div className="col-span-full flex w-full flex-col  space-y-4 p-6 xl:col-span-8">
          <div>
            <h1 className="text-2xl font-semibold">Service Catalog™</h1>
          </div>
          <div>
            <h2 className="font-heading text-5xl font-bold">
              Clear scope.
              <br />
              Upfront price.
              <br />
              No surprises.
            </h2>
          </div>
          <div className="py-4">
            <p className="text-balance font-[450]">
              Complete your most pressing work with our service catalog, <br />{" "}
              Browse and buy the exact service you're looking for in just a few
              clicks.
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <form action="/services/search" method="get">
              <div className="relative flex h-10 w-[500px] max-w-full items-center py-0.5">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transform">
                  <Search className="h-4 w-4 text-primary-dark" />
                </div>
                <Input
                  type="text"
                  name="q"
                  placeholder="Search"
                  className="h-full w-full rounded-sm border border-border/80 bg-primary-foreground pl-9 text-primary-dark focus-visible:border-x-primary-light"
                />
              </div>
            </form>

            <div className="flex items-center gap-4">
              <span className="d-none d-lg-inline mr-2x flex-none">
                Popular:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/services/tech-development"
                  className="flex w-fit items-center gap-1.5 rounded-full bg-primary-foreground px-3 py-0.5 text-sm font-medium text-primary-dark"
                >
                  <div>
                    <Search className="h-4 w-4" />
                  </div>
                  Tech & Development
                </a>
                <a
                  href="/services/data-ai"
                  className="flex w-fit items-center gap-1.5 rounded-full bg-primary-foreground px-3 py-0.5 text-sm font-medium text-primary-dark"
                >
                  <div>
                    <Search className="h-4 w-4" />
                  </div>
                  Data & AI
                </a>
                <a
                  href="/services/ai-services"
                  className="flex w-fit items-center gap-1.5 rounded-full bg-primary-foreground px-3 py-0.5 text-sm font-medium text-primary-dark"
                >
                  <div>
                    <Search className="h-4 w-4" />
                  </div>
                  AI Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16">
        <h1 className="text-2xl font-semibold lg:text-3xl">
          Popular Categories
        </h1>
        <div className="mt-4">
          <PopularCategories />
        </div>
      </section>

      <section className="w-full pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
          <div className="flex w-full flex-col space-y-8 px-0 pt-16 md:px-6">
            <h1 className="text-2xl font-semibold lg:text-3xl">How it works</h1>
            <ul className="flex flex-col space-y-4">
              <li className="flex items-start gap-3">
                <div className="pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                    className="h-8 w-8 text-lime-950 dark:text-lime-300"
                  >
                    <path
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 5a9.31 9.31 0 00-9 7 9.29 9.29 0 0018 0 9.31 9.31 0 00-9-7zm0 10.1a3.1 3.1 0 113.1-3.1 3.1 3.1 0 01-3.1 3.1z"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col -space-y-0.5 leading-10">
                  <h5 className="text-lg font-semibold">Browse</h5>
                  <div className="text-sm font-[450] text-muted-foreground">
                    Find the type of work you need, clearly defined and ready to
                    start.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                    className="h-8 w-8 text-lime-950 dark:text-lime-300"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9.231 14.08h7.53a3.02 3.02 0 002.949-2.385l.875-4.027a2.014 2.014 0 00-1.962-2.436H6.785"
                    />
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 3h2.376a1.007 1.007 0 011.006.736l2.849 10.347-1.661 1.188a1.007 1.007 0 00.584 1.822h10.71"
                    />
                    <path
                      fill="currentColor"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10.359 21a.574.574 0 100-1.149.574.574 0 000 1.148zm6.612 0a.574.574 0 100-1.149.574.574 0 000 1.148z"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col -space-y-0.5 leading-10">
                  <h5 className="text-lg font-semibold">Buy</h5>
                  <div className="text-sm font-[450] text-muted-foreground">
                    Work begins as soon as you purchase and provide
                    requirements.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                    className="h-7 w-7 text-lime-950 dark:text-lime-300"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 3l-9.26 11L8 9.55"
                    />
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 8v10a3 3 0 01-3 3H6a3 3 0 01-3-3V6a3 3 0 013-3h10"
                    />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col -space-y-0.5 leading-10">
                  <h5 className="text-lg font-semibold">Approve</h5>
                  <div className="text-sm font-[450] text-muted-foreground">
                    Receive your project by a set deadline. Review, approve, and
                    pay.
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full md:h-[85%]">
            <img
              src="https://www.upwork.com/static/assets/CatalogApp/img/projects.0649863.svg"
              alt=""
              className="h-full bg-contain"
            />
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="flex w-full flex-col space-y-8 px-0 py-16 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold lg:text-3xl">
              Top Services for You
            </h1>
            <Button asChild variant={"link"}>
              <Link href={"/services/search"}>
                Show all
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.service.id} {...service} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;

async function getManyServices() {
  let dbServices = await db.gig.findMany({
    where: {
      status: "published",
      isPaused: false,
    },
    select: {
      id: true,
      slug: true,
      attachments: {
        select: {
          id: true,
          url: true,
        },
        where: {
          type: "image",
        },
      },
      createdAt: true,
      title: true,
      reviews: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
          rating: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      packages: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      owner: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  let formattedServices = dbServices.map((service) => {
    let averageRating =
      service.reviews.reduce((acc, review) => acc + review.rating, 0) /
      service.reviews.length;
    let numberOfReviews = service.reviews.length;
    return {
      author: {
        id: service.owner.id,
        name: service.owner.name,
        username: service.owner.username,
        avatar: service.owner.image,
      },
      service: {
        id: service.id,
        title: service.title,
        images: service.attachments.map((attachment) => attachment.url),
        price: service.packages[0]?.price,
        createdAt: service.createdAt.toISOString(),
      },
      numberOfReviews,
      rating: averageRating,
    };
  });

  return formattedServices
}
