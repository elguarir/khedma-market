"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrencyInput from "react-currency-input-field";

import { useStep } from "../utils/use-step";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  step: number;
};

export const formSchema = z.object({
  title: z
    .string({ required_error: "Field is required." })
    .min(15, {
      message: "Title must be at least 15 characters.",
    })
    .refine(
      (val) => {
        let numWords = val.trim().split(" ").length;
        return numWords > 3;
      },
      {
        message: "Title must be at least 4 words.",
      },
    ),
  category: z.string({ required_error: "Field is required." }),
  subCategory: z.string({ required_error: "Field is required." }),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});
const PricingStep = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: defaultValues,
  });

  let setCurrentStep = useStep((s) => s.setStep);
  function onSubmit(data: z.infer<typeof formSchema>) {
    // updateGig({
    //   id,
    //   ...data,
    // });

    // setOverview(data);

    setCurrentStep(props.step + 1);
  }
  // if (props.step !== currentStep) return null;

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Pricing</h3>
          <p className="text-muted-foreground">Step {props.step} of 6</p>
        </div>
        <p className="text-muted-foreground">
          Add packages you offer for this gig, and set your pricing.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-6" disabled={false}>
            <div className="grid gap-8">
              <header className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Scope & Pricing</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center font-medium text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger>
                        <QuestionMarkCircledIcon className="mr-1 h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-60">
                        <p className="font-medium">
                          To give buyers more options we recommend offering 3
                          packages for this service.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    Offer Packages
                  </div>
                  <Switch />
                </div>
              </header>
              <div className="grid w-full grid-cols-11 divide-x overflow-hidden rounded-md border border-input shadow-sm">
                {/* labels & options */}
                <div className="col-span-2 h-full w-full">
                  <header className="flex h-16 w-full items-center justify-center border-b" />
                  <div className="grid w-full space-y-0 divide-y">
                    <div className="h-[80px] px-3">
                      <Label className="font-semibold">Name</Label>
                    </div>
                    <div className="h-[81px] px-3">
                      <Label className="font-semibold">Description</Label>
                    </div>
                    <div className="flex h-[37px] items-center px-3">
                      <Label className="font-semibold">Delivery Time</Label>
                    </div>
                    <div className="flex h-[37px] items-center px-3">
                      <Label className="font-semibold">Revisions</Label>
                    </div>
                    <div className="flex h-[37px] items-center px-3">
                      <Label className="font-semibold">Price</Label>
                    </div>
                  </div>
                </div>
                {/* basic package options */}
                <div className="col-span-3 h-full w-full">
                  <header className="flex h-16 w-full items-center justify-center border-b bg-neutral-50">
                    <h5 className="text-center text-lg font-semibold uppercase text-muted-foreground">
                      Basic
                    </h5>
                  </header>

                  <div className="grid w-full divide-y">
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Name your package"
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the details of this package"
                      ></textarea>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Delivery time" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="2">2 Days</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="4">4 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="6">6 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="10">10 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="21">21 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Revision" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Revisions</SelectItem>
                          <SelectItem value="2">2 Revisions</SelectItem>
                          <SelectItem value="3">3 Revisions</SelectItem>
                          <SelectItem value="4">4 Revisions</SelectItem>
                          <SelectItem value="5">5 Revisions</SelectItem>
                          <SelectItem value="6">6 Revisions</SelectItem>
                          <SelectItem value="7">7 Revisions</SelectItem>
                          {/* unlimited */}
                          <SelectItem value="-1">
                            Unlimited Revisions
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <CurrencyInput
                        placeholder="Price"
                        prefix="MAD "
                        allowNegativeValue={false}
                        className="w-full border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        decimalsLimit={2}
                        onValueChange={(value, name, values) =>
                          console.log(value, name, values)
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* standard package options */}
                <div className="col-span-3 h-full w-full">
                  <header className="flex h-16 w-full items-center justify-center border-b bg-neutral-50">
                    <h5 className="text-center text-lg font-semibold uppercase text-muted-foreground">
                      Standard
                    </h5>
                  </header>

                  <div className="grid w-full divide-y">
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Name your package"
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the details of this package"
                      ></textarea>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Delivery time" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="2">2 Days</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="4">4 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="6">6 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="10">10 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="21">21 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Revision" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Revisions</SelectItem>
                          <SelectItem value="2">2 Revisions</SelectItem>
                          <SelectItem value="3">3 Revisions</SelectItem>
                          <SelectItem value="4">4 Revisions</SelectItem>
                          <SelectItem value="5">5 Revisions</SelectItem>
                          <SelectItem value="6">6 Revisions</SelectItem>
                          <SelectItem value="7">7 Revisions</SelectItem>
                          {/* unlimited */}
                          <SelectItem value="-1">
                            Unlimited Revisions
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <CurrencyInput
                        placeholder="Price"
                        prefix="MAD "
                        allowNegativeValue={false}
                        className="w-full border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        decimalsLimit={2}
                        onValueChange={(value, name, values) =>
                          console.log(value, name, values)
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* premium package options */}
                <div className="col-span-3 h-full w-full">
                  <header className="flex h-16 w-full items-center justify-center border-b bg-neutral-50">
                    <h5 className="text-center text-lg font-semibold uppercase text-muted-foreground">
                      Premium
                    </h5>
                  </header>

                  <div className="grid w-full divide-y">
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Name your package"
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe the details of this package"
                      ></textarea>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Delivery time" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="2">2 Days</SelectItem>
                          <SelectItem value="3">3 Days</SelectItem>
                          <SelectItem value="4">4 Days</SelectItem>
                          <SelectItem value="5">5 Days</SelectItem>
                          <SelectItem value="6">6 Days</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="10">10 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="21">21 Days</SelectItem>
                          <SelectSeparator />
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="60">60 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select>
                        <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                          <SelectValue placeholder="Revision" />
                        </SelectTrigger>
                        <SelectContent align="center">
                          <SelectItem value="1">1 Revisions</SelectItem>
                          <SelectItem value="2">2 Revisions</SelectItem>
                          <SelectItem value="3">3 Revisions</SelectItem>
                          <SelectItem value="4">4 Revisions</SelectItem>
                          <SelectItem value="5">5 Revisions</SelectItem>
                          <SelectItem value="6">6 Revisions</SelectItem>
                          <SelectItem value="7">7 Revisions</SelectItem>
                          {/* unlimited */}
                          <SelectItem value="-1">
                            Unlimited Revisions
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <CurrencyInput
                        placeholder="Price"
                        prefix="MAD "
                        allowNegativeValue={false}
                        className="w-full border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        decimalsLimit={2}
                        onValueChange={(value, name, values) =>
                          console.log(value, name, values)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button isLoading={false} loadingText="Saving..." type="submit">
                Save & Continue
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default PricingStep;
