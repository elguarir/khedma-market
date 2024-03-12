"use client";
import React from "react";
import { useStep } from "../utils/use-step";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  step: number;
  gigId: string;
};

const Publish = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  let router = useRouter();
  let { mutate: publish, isLoading } = api.gig.publish.useMutation();

  if (props.step !== currentStep) return null;
  return (
    <div className="mx-auto flex min-h-full w-full flex-col items-center justify-center gap-6 px-10 py-6 pb-14 text-center md:max-w-lg">
      <img className="w-full" src="/images/success-illustration.svg" alt="" />
      <div className="flex flex-col items-center justify-center gap-3 text-balance ">
        <h2 className="text-xl font-semibold leading-tight md:text-2xl">
          Congratulations, your gig is now ready to be published
        </h2>
        <p className="text-sm text-muted-foreground">
          Your gig is now ready to be published and available for purchase by
          buyers.
        </p>
        <Button
          isLoading={isLoading}
          loadingText="Publishing..."
          onClick={() => {
            publish(
              { id: props.gigId },
              {
                onSuccess: (gig) => {
                  toast.success("Gig published successfully!", {
                    action: {
                      label: "View Gig",
                      onClick: () => {
                        router.push(`/${gig.owner.username}/${gig.slug}`);
                      },
                    },
                    duration: 5000,
                  });
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              },
            );
          }}
        >
          <Icons.sendIcon className="mr-2 h-4 w-4" />
          Publish
        </Button>
      </div>

      {/* after publish */}
      {/* <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Congratulations! Your gig is now live
        </h2>
        <p className="text-muted-foreground">
          Your gig is now live and available for purchase. You can view your gig
          from your dashboard.
        </p>
        <div className="mt-6 flex justify-end">
          <button onClick={() => setCurrentStep(1)} className="btn btn-primary">
            View Gig
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Publish;
