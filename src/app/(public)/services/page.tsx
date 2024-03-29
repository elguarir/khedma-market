import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import { CategoryCardProps } from "./_components/category-card";
import PopularCategories from "./_components/popular-categories";
type Props = {};

const ServicesPage = (props: Props) => {
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
            <div className="relative flex h-10 w-[500px] max-w-full items-center py-0.5">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 transform">
                <Search className="h-4 w-4 text-primary-dark" />
              </div>
              <Input
                type="text"
                placeholder="Search"
                className="focus-visible:border-x-primary-light h-full w-full rounded-sm border border-border/80 bg-primary-foreground pl-9 text-primary-dark"
              />
            </div>
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
        <h1 className="text-2xl font-semibold">Popular Categories</h1>
        <div className="mt-4">
          <PopularCategories />
        </div>
      </section>

      <section className="w-full py-16">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-8 p-6 py-16">
            <h1 className="text-2xl font-semibold">How it works</h1>
            <ul className="flex flex-col space-y-4">
              <li className="flex items-start gap-3">
                <div className="pt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                    className="h-8 w-8 text-lime-950"
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
                    className="h-8 w-8 text-lime-950"
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
                    className="h-8 w-8 text-lime-950"
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
          <div className="w-full">
            <img
              src="https://www.upwork.com/static/assets/CatalogApp/img/projects.0649863.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
