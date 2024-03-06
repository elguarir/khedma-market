import { Separator } from "@/components/ui/separator";
import React from "react";
import { OverviewStep } from "./_components/overview-step";
import Stepper from "./_components/stepper";
import PricingStep from "./_components/pricing-step";
import DescriptionFaq from "./_components/description-faq";
import { getGigById } from "@/server/api/routers/gig";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

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
          <PricingStep step={2} />
          <DescriptionFaq step={3} />
        </div>
      </div>
    </main>
  );
};

export default NewGigPage;
