import { Separator } from "@/components/ui/separator";
import React from "react";
import { OverviewStep } from "./_components/overview-step";
import Stepper from "./_components/stepper";
import PricingStep from "./_components/pricing-step";
import DescriptionFaq from "./_components/description-faq";
import {
  getGigById,
  getGigPackages,
  doesOffersMultiplePackages,
  getGigGallery,
  getDescriptionFaq,
} from "@/server/api/routers/gig";
import { redirect } from "next/navigation";
import Gallery from "./_components/gallery";
import Publish from "./_components/publish";

type Props = {
  params: {
    id: string;
  };
};

const NewGigPage = async (props: Props) => {
  let gig = await getGigById(props.params.id);
  if (!gig) {
    return redirect("/dashboard/gigs");
  }
  let offers = await doesOffersMultiplePackages(gig.id);
  let packages = await getGigPackages(gig.id);
  let descriptionFaq = await getDescriptionFaq(gig.id);
  let gallery = await getGigGallery(gig.id);
  console.log("gig questions", descriptionFaq.faq);
  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">New Gig</h2>
        <p className="text-muted-foreground">
          Create a new gig to start selling your services
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid w-full grid-cols-1 gap-16">
        <Stepper />
        <div className="grid grid-cols-1 gap-8">
          <OverviewStep
            id={gig.id}
            defaultValues={{
              title: gig.title ?? undefined,
              category: gig.category?.parentId ?? undefined,
              tags:
                gig.tags.map((tag) => ({
                  id: tag.id,
                  text: tag.name,
                })) ?? undefined,
              subCategory: gig.category?.id ?? undefined,
            }}
            step={1}
          />
          <PricingStep
            offersMultiplePackages={offers}
            defaultValues={packages}
            gigId={gig.id}
            step={2}
          />
          <DescriptionFaq
            defaultValues={{
              description: descriptionFaq.description,
              faq: descriptionFaq.faq,
            }}
            gigId={gig.id}
            step={3}
          />
          <Gallery defaultValues={gallery} gigId={gig.id} step={4} />
          <Publish gigId={gig.id} step={5} />
        </div>
      </div>
    </main>
  );
};

export default NewGigPage;
