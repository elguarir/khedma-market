import { getGigDetails } from "@/server/api/routers/gig";
import { HomeIcon, SlashIcon, StarFilledIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { BlockRenderer } from "@/components/block-renderer";
import { OutputData } from "@editorjs/editorjs";
import { Separator } from "@/components/ui/separator";
import Faqs from "./_components/faqs";
import Packages from "./_components/packages";
import AboutSeller from "./_components/about-seller";
import { notFound } from "next/navigation";

type Props = {
  params: { username: string; slug: string };
};

const GigDetailsPage = async (props: Props) => {
  let gig = await getGigDetails(props.params.username, props.params.slug);
  if (!gig) return notFound();

  return (
    <main className="flex min-h-[calc(100vh-90px)] w-full flex-col py-8 xl:py-12">
      <div className="grid w-full grid-cols-11 gap-y-12 xl:gap-x-16">
        {/* gig details */}
        <div className="col-span-full flex  h-full w-full flex-col gap-7 rounded-md bg-neutral-100/0 xl:p-4  xl:col-span-7">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <HomeIcon />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categories/${gig?.category?.slug}`}>
                    {gig?.category?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex w-full flex-col gap-5">
            <h1 className="text-3xl font-semibold">{gig?.title}</h1>
            <div className="flex w-full items-center gap-4">
              <Avatar className="h-14 w-14 border">
                <AvatarImage src={gig?.owner.image ?? ""} />
                <AvatarFallback>
                  {gig?.owner.name ? (
                    gig?.owner.name[0]
                  ) : (
                    <img src="/images/placeholder.png" alt="" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Link
                  href={`/${gig?.owner.username}`}
                  className="text-lg font-semibold transition hover:underline"
                >
                  {gig?.owner.name}
                </Link>
                <div className="flex items-center gap-2">
                  {!Number.isNaN(gig?.owner.rating) && (
                    <div className="flex items-center gap-0.5">
                      <StarFilledIcon className="h-4 w-4" />
                      {gig?.owner.rating}
                    </div>
                  )}
                  ({gig?.owner.numberOfReviews} reviews)
                </div>
              </div>
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {gig?.attachments.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-video items-center justify-center p-4">
                        <img
                          className="h-full w-full object-cover"
                          src={image.url}
                          alt={image.name}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="max-xl:-left-6" />
            <CarouselNext className="max-xl:-right-6" />
          </Carousel>
          <div className="flex w-full flex-col gap-4">
            <div className="group prose prose-neutral w-full">
              <h2>About this gig</h2>
              {(gig?.description as OutputData | null)?.blocks
                .slice(0, 3)
                .map((block) => <BlockRenderer key={block.id} block={block} />)}
              <div className="hidden group-has-[:checked]:block">
                {(gig?.description as OutputData | null)?.blocks
                  .slice(3)
                  .map((block) => (
                    <BlockRenderer key={block.id} block={block} />
                  ))}
                <label
                  htmlFor="read-more"
                  className="text-primary-500 hidden cursor-pointer font-semibold underline transition group-has-[:checked]:block"
                >
                  Read less
                </label>
              </div>
              <label className="text-primary-500 cursor-pointer font-semibold underline transition group-has-[:checked]:hidden">
                Read more
                <input type="checkbox" id="read-more" className="hidden" />
              </label>
            </div>
          </div>
          {gig?.faqs && gig?.faqs.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold">FAQ</h2>
                <div className="w-full">
                  <Faqs
                    faqs={gig?.faqs.map((faq) => ({
                      question: faq.question,
                      answer: faq.answer,
                    }))}
                  />
                </div>
              </div>
            </>
          )}

          <div className="py-16">
            <AboutSeller id={gig.owner.id} />
          </div>
        </div>

        {/* packages & ordering */}
        <Packages gig={gig} />
      </div>
    </main>
  );
};

export default GigDetailsPage;
