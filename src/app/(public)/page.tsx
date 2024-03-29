import Link from "next/link";
import HeroSection from "./_components/hero";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
export default async function Home() {

  const services = [
    {
      title: "Creative Services",
      subtitle: "Explore",
      image:
        "https://fiverr-res.cloudinary.com/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161236/illustration-2x.png",
      href: "/categories/creative-services",
    },
    {
      title: "Tech & Development",
      subtitle: "Explore",
      image:
        "https://fiverr-res.cloudinary.com/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png",
      href: "/categories/tech-development",
    },
    {
      title: "Business & Consulting",
      image:
        "https://fiverr-res.cloudinary.com/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png",
      href: "/categories/business-consulting",
      subtitle: "Explore",
    },
    {
      title: "Analytics & Strategy",
      image:
        "https://fiverr-res.cloudinary.com/v1/attachments/generic_asset/asset/27f914ed7984fdd2d55aa1fb5e74bd6a-1690384243592/seo-2x.png",
      href: "/categories/analytics-strategy",
      subtitle: "Explore",
    },
    {
      title: "Data & AI",
      subtitle: "Explore",
      image:
        "https://fiverr-res.cloudinary.com/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161248/data-entry-2x.png",
      href: "/categories/data-ai",
    },
  ] as ServiceCardProps[];

  return (
    <main className="flex w-full flex-col">
      
      <HeroSection />
      
      <section className="flex flex-col gap-4 px-4 py-6">
        <div className="font-medium text-muted-foreground">Trusted by</div>
        <div className="flex items-center gap-8">
          <img className="h-12" src="/images/iam.svg" alt="iam logo" />
          <img className="h-12" src="/images/orange.png" alt="orange logo" />
          <img className="h-12" src="/images/ocp.png" alt="ocp logo" />
        </div>
      </section>

      {/* categories section */}
      <section className="flex w-full flex-col gap-10 py-10">
        <div>
          <h2 className="text-2xl font-semibold">Popular Services</h2>
          <p className="text-sm font-[450] text-muted-foreground">
            Looking for work?{" "}
            <Link
              href={"/jobs"}
              className="text-primary underline transition-colors hover:text-primary-dark"
            >
              Browse jobs
            </Link>
          </p>
        </div>
        <div className="hidden gap-4 md:grid md:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
        <Carousel className="w-full md:hidden">
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index}>
                <ServiceCard {...service} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 z-[4]" />
          <CarouselNext className="-right-4 z-[4]" />
        </Carousel>
      </section>

      {/* up your game */}
      <section className="w-full py-16 lg:py-24">
        <div className="grid w-full grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
          <div className="h-full w-full rounded-md bg-lime-700/40 max-md:h-72"></div>
          <div className="flex flex-col space-y-8 py-4">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Up your work game, it’s easy
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20.981 13.7v3.287a2.997 2.997 0 01-2.997 2.997H5.998A2.997 2.997 0 013 16.986v-9.99A2.997 2.997 0 015.997 4h4.995m5.25 2.059l2.737 2.757"
                    />
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11.99 15.358l-1.489.29a.999.999 0 01-.49 0 1.119 1.119 0 01-.42-.25 1 1 0 01-.249-.41.909.909 0 010-.489l.28-1.508c.085-.38.28-.728.56-1l7.362-7.362a1.85 1.85 0 01.649-.44c.247-.116.516-.18.79-.189.264.002.525.056.768.16.247.1.471.25.66.44a2 2 0 01.44.649 2.082 2.082 0 010 1.548 1.998 1.998 0 01-.44.65l-7.423 7.352c-.27.28-.618.474-.999.56z"
                    />
                  </svg>
                </div>{" "}
                <div className="flex flex-col -space-y-0.5">
                  <h5 className="mb-0 text-lg font-[550]">No cost to join</h5>{" "}
                  <p className="text-sm text-muted-foreground">
                    Register and browse professionals, explore projects, or even
                    book a consultation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5"
                      d="M15 19l.3-.3c2.8-2.8 2.8-7.2 0-10C12.5 6 8 6 5.3 8.8L5 9l10 10z"
                    />
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth="1.5"
                      d="M17 11.5l3.3-3.3c.4-.4.4-1 0-1.4l-3.1-3.1c-.4-.4-1-.4-1.4 0L12.5 7M10 14l-7 7"
                    />
                  </svg>
                </div>{" "}
                <div className="flex flex-col -space-y-0.5">
                  <h5 className="mb-0 text-lg font-[550]">
                    Post a job and hire top talent
                  </h5>{" "}
                  <p className="text-sm text-muted-foreground">
                    Finding talent doesn’t have to be a chore. Post a job or we
                    can search for you!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    role="img"
                  >
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M20.015 16.114l-7.039 4.578a1.908 1.908 0 01-2.079 0l-7.039-4.578A1.908 1.908 0 013 14.512V4.907A1.907 1.907 0 014.907 3h14.059a1.908 1.908 0 011.907 1.907v9.605a1.908 1.908 0 01-.858 1.602z"
                      clipRule="evenodd"
                    />
                    <path
                      vectorEffect="non-scaling-stroke"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M11.939 5.33l1.392 3.596 3.854.21-2.995 2.441.992 3.73-3.243-2.1-3.243 2.1 1.002-3.73-3.005-2.442 3.863-.21 1.383-3.595z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>{" "}
                <div className="flex flex-col -space-y-0.5">
                  <h5 className="mb-0 text-lg font-[550]">
                    Work with the best—without breaking the bank
                  </h5>{" "}
                  <p className="text-sm text-muted-foreground">
                    Upwork makes it affordable to up your work and take
                    advantage of low transaction rates.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/auth/sign-up">Sign up for free</Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link href="/auth/sign-in">Learn more</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* for clients section */}
      <section className="aspect-[16/7.5] rounded-md bg-[url('https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale/brontes/delivery-models/find-talent-2x.jpg')] p-4 sm:p-8 [background-position:top] [background-size:cover]">
        <div className="flex h-full flex-col gap-4">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <p className="headline mt-4 text-lg font-medium text-neutral-100 md:mt-0">
                  For clients
                </p>{" "}
                <h2 className="font-heading text-5xl sm:text-6xl font-semibold leading-[0.9] text-neutral-100">
                  <span>
                    Find talent
                    <br /> your way
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div className="span-md-7 span-lg-5">
                <p className="max-w-prose text-balance sm:text-lg font-medium text-neutral-100">
                  Work with the largest network of independent professionals and
                  get things done—from quick turnarounds to big transformations.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 gap-y-4 md:mt-auto md:grid-cols-3">
            <div className="hover:bg-primary-light rounded-lg bg-primary p-4 text-neutral-100 transition-colors duration-300">
              <Link href="/jobs/" className="flex flex-col gap-2">
                <div className="text-3xl font-medium leading-8">
                  Post a job
                  <br /> and hire a pro
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-50">
                    Talent Marketplace<sup>TM</sup>
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
            <div className="hover:bg-primary-light rounded-lg bg-primary p-4 text-neutral-100 transition-colors duration-300">
              <Link href="/services" className="flex flex-col gap-2">
                <div className="text-3xl font-medium leading-8">
                  Browse and
                  <br /> find services
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-50">
                    Service Catalog<sup>TM</sup>
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* why businesses turn to us */}
      <section className="flex flex-col gap-8 py-16 lg:py-24">
        <div className="relative grid aspect-[16/7] w-full gap-4 lg:grid-cols-12">
          <div className="col-span-full grid rounded-md bg-lime-900/10 p-6 sm:p-12 text-lime-950 dark:text-primary-foreground lg:col-span-8">
            <div className="flex flex-col space-y-10">
              <h2 className="font-heading text-5xl sm:text-6xl font-bold">
                <span>
                  Why
                  <br />
                  Khedma Market ?
                </span>
              </h2>
              {/* whys */}
              <div className="flex flex-col space-y-8">
                <div className="flex items-center gap-4">
                  <div>
                    <StarIcon />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Proof of quality</h3>
                    <p className="font-medium xl:max-w-[480px]">
                      Check any pro’s portfolio projects, client reviews and
                      prior experiences.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <StarIcon />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Wide Range of Services
                    </h3>
                    <p className="font-medium xl:max-w-[480px]">
                      Access a diverse range of services spanning various
                      industries and expertise.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <StarIcon />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Job Opportunities
                    </h3>
                    <p className="font-medium xl:max-w-[480px]">
                      Explore a plethora of job opportunities from top companies
                      seeking skilled professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary-light col-span-full grid rounded-md p-5 text-lime-50 lg:col-span-4">
            <div className="flex h-full flex-col justify-end p-8">
              <h4 className="text-4xl font-semibold leading-10 tracking-tight">
                The 1<sup>st</sup> Hub for professionals in Morocco!
              </h4>
            </div>
          </div>

          <img
            className="h-full object-contain absolute lg:block inset-y-0 right-48 xl:right-64 hidden py-12"
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/brontes/why-upwork/person-with-headset.png"
          />
        </div>
      </section>

      <div className="h-screen"></div>
    </main>
  );
}

interface ServiceCardProps {
  subtitle: string;
  title: string;
  image: string;
  href: string;
}
const ServiceCard = (props: ServiceCardProps) => (
  <div className="relative aspect-[9/12] h-full w-full rounded-md">
    <Link
      href={props.href}
      className="flex h-full w-full flex-col items-start justify-start gap-2"
    >
      <h4 className="z-[1] p-4 text-2xl font-semibold leading-7 tracking-tight text-neutral-50">
        <small className="text-sm font-medium">
          {props.subtitle} <br />
        </small>
        {props.title}
      </h4>
      <img
        src={props.image}
        alt={props.title}
        className="absolute h-full w-full rounded-md object-cover"
      />
    </Link>
  </div>
);

const StarIcon = () => (
  <svg
    className="h-10 w-10"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={"0.5px"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3C12.75 3.41421 12.4142 3.75 12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 11.5858 20.5858 11.25 21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61523 21.75 2.25 17.3848 2.25 12C2.25 6.61523 6.61523 2.25 12 2.25Z"
      fill="currentColor"
      strokeWidth={"0.5px"}
    />
    <path
      d="M19.4697 3.46967C19.7626 3.17678 20.2374 3.17678 20.5303 3.46967C20.7966 3.73594 20.8208 4.1526 20.6029 4.44621L20.5303 4.53033L17.5303 7.53033C17.2374 7.82322 16.7626 7.82322 16.4697 7.53033C16.2034 7.26406 16.1792 6.8474 16.3971 6.55379L16.4697 6.46967L19.4697 3.46967Z"
      fill="currentColor"
      strokeWidth={"0.5px"}
    />
    <path
      d="M15.4697 2.46967C15.7626 2.17678 16.2374 2.17678 16.5303 2.46967C16.7966 2.73594 16.8208 3.1526 16.6029 3.44621L16.5303 3.53033L15.5303 4.53033C15.2374 4.82322 14.7626 4.82322 14.4697 4.53033C14.2034 4.26406 14.1792 3.8474 14.3971 3.55379L14.4697 3.46967L15.4697 2.46967Z"
      fill="currentColor"
      strokeWidth={"0.5px"}
    />
    <path
      d="M20.4697 7.46967C20.7626 7.17678 21.2374 7.17678 21.5303 7.46967C21.7966 7.73594 21.8208 8.1526 21.6029 8.44621L21.5303 8.53033L20.5303 9.53033C20.2374 9.82322 19.7626 9.82322 19.4697 9.53033C19.2034 9.26406 19.1792 8.8474 19.3971 8.55379L19.4697 8.46967L20.4697 7.46967Z"
      fill="currentColor"
      strokeWidth={"0.5px"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0159 8.77499L11.3971 6.82322C11.8302 6.21089 12.6777 6.06558 13.29 6.49866C13.5338 6.67109 13.714 6.91907 13.8026 7.20425L14.5119 9.48699L16.7957 10.1973C17.4671 10.406 17.8608 11.088 17.7239 11.7625L17.6894 11.8972C17.6007 12.1824 17.4205 12.4304 17.1767 12.6029L15.2239 13.983L15.255 16.3744C15.264 17.0802 14.7329 17.6671 14.0448 17.7417L13.9141 17.7496C13.6156 17.7532 13.3243 17.6585 13.085 17.48L11.1679 16.05L8.90417 16.8179C8.23826 17.0436 7.51901 16.7231 7.23332 16.0969L7.1821 15.9677C7.08627 15.685 7.08627 15.3785 7.18214 15.0957L7.94895 12.831L6.51992 10.9149C6.09943 10.3514 6.18187 9.56831 6.68912 9.10305L6.79621 9.0144C7.03551 8.83585 7.32698 8.74113 7.62561 8.74492L10.0159 8.77499ZM13.1971 10.3093L12.4549 7.92299L11.0135 9.96351C10.871 10.165 10.6384 10.2835 10.3916 10.2804L7.89395 10.248L9.38801 12.2502C9.51455 12.4197 9.56263 12.6334 9.52386 12.8382L9.4972 12.9396L8.69395 15.305L11.0604 14.5028C11.2608 14.4348 11.4788 14.4551 11.6616 14.5553L11.7498 14.612L13.7509 16.105L13.7196 13.6084C13.7169 13.3968 13.8035 13.1957 13.9553 13.0528L14.0365 12.9864L16.0759 11.544L13.6906 10.8029C13.4886 10.7401 13.3241 10.5955 13.2351 10.4071L13.1971 10.3093Z"
      fill="currentColor"
      strokeWidth={"0.5px"}
    />
  </svg>
);
