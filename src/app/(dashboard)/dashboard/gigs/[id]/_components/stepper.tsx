"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { steps } from "../utils";
import { useStep } from "../utils/use-step";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type Props = {};

const Stepper = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  return (
    <header className="flex w-full items-center justify-between gap-2">
      <nav className="w-full text-base font-semibold">
        <ul className="grid w-full grid-cols-1 gap-4 md:flex md:flex-wrap md:items-center">
          {steps.map((step, i) => {
            let isActive = step.id === currentStep;
            let isCompleted = step.id < currentStep;
            return (
              <>
                <li
                  key={step.id}
                  className="flex cursor-pointer select-none items-center gap-2"
                >
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
                      isActive ? "text-foreground" : "text-muted-foreground",
                      isCompleted && "text-primary",
                    )}
                    data-active={isActive}
                    data-step={step.id}
                    key={i}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    {step.label}
                  </span>
                  {i !== steps.length - 1 && (
                    <div className="hidden lg:block">
                      <ChevronRightIcon strokeWidth={2} className="h-4 w-4" />
                    </div>
                  )}
                </li>
                <Separator key={step.id} className="w-full md:hidden" />
              </>
            );
          })}
        </ul>
      </nav>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant={"outline"}>Save</Button>
      </div>
    </header>
  );
};

export default Stepper;
