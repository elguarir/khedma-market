"use client";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

type Props = {};

const NewGigPage = (props: Props) => {
  let [currentStep, setCurrentStep] = useState(1);
  let steps = [
    {
      id: 1,
      label: "Overview",
    },
    {
      id: 2,
      label: "Pricing",
    },
    {
      id: 3,
      label: "Description & FAQ",
    },
    {
      id: 4,
      label: "Gallery",
    },
    {
      id: 5,
      label: "Requirements",
    },
    {
      id: 6,
      label: "Publish",
    },
  ];
  return (
    <main>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">New Gig</h2>
        <p className="text-muted-foreground">
          Create a new gig to start selling your services
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <div className="flex w-full items-center justify-between gap-2">
          <nav className="text-base font-semibold">
            <ul className="flex items-center space-x-4">
              {steps.map((step, i) => {
                let isActive = step.id === currentStep;
                let isCompleted = step.id < currentStep;
                return (
                  <>
                    <li className="flex cursor-pointer select-none items-center gap-2">
                      <div
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground ",
                          isActive && "bg-primary text-primary-foreground",
                          isCompleted && "bg-primary",
                        )}
                      >
                        {isCompleted ? (
                          <div>
                            <Icons.check className="h-4 w-4 text-primary-foreground" />
                          </div>
                        ) : (
                          step.id
                        )}
                      </div>
                      <span
                        className={cn(
                          "flex items-center",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground",
                          isCompleted && "text-primary",
                        )}
                        data-active={isActive}
                        data-step={step.id}
                        key={i}
                        onClick={() => setCurrentStep(step.id)}
                      >
                        {step.label}
                      </span>
                    </li>
                    {i !== steps.length - 1 && (
                      <div>
                        <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
                      </div>
                    )}
                  </>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewGigPage;
