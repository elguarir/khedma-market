"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { packageSchema } from "@/schemas";
import { api } from "@/trpc/react";

export const formSchema = z.object({
  basic: packageSchema.required(),
  standard: packageSchema,
  premium: packageSchema,
});

export type TformSchema = z.infer<typeof formSchema>;

type Props = {
  step: number;
  gigId: string;
  defaultValues: Partial<TformSchema>;
  offersMultiplePackages: boolean | undefined;
};
const PricingStep = (props: Props) => {
  // states
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  // mutations
  let { mutate: createPackages, isLoading } =
    api.gig.createPackages.useMutation();

  let { data: offerPackages } = api.gig.doesOffersMultiplePackages.useQuery(
    { id: props.gigId },
    {
      initialData: props.offersMultiplePackages,
    },
  );

  let utils = api.useUtils();

  let { mutate: updateOffersMultiplePackages, isLoading: isUpdating } =
    api.gig.udpateOffersMultiplePackages.useMutation();

  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: props.defaultValues.basic,
      standard: props.defaultValues.standard,
      premium: props.defaultValues.premium,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    let standardExists = Object.values(data.standard).every(
      (v) => v !== undefined,
    );
    let premiumExists = Object.values(data.premium).every(
      (v) => v !== undefined,
    );
    if (offerPackages && (!standardExists || !premiumExists)) {
      toast.error("When offering packages, all fields are required");
      return;
    }

    createPackages(
      {
        basic: data.basic,
        standard: offerPackages ? data.standard : undefined,
        premium: offerPackages ? data.premium : undefined,
        gigId: props.gigId,
      },
      {
        onSuccess: (data) => {
          setCurrentStep(3);
        },
      },
    );
  }

  if (props.step !== currentStep) return null;
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
          <fieldset className="w-full space-y-6" disabled={isLoading}>
            <div className="grid gap-8">
              <header className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Scope & Pricing</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center font-medium text-muted-foreground">
                    <Tooltip>
                      <TooltipTrigger type="button">
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
                  <Switch
                    checked={offerPackages}
                    onCheckedChange={(v) => {
                      updateOffersMultiplePackages(
                        { id: props.gigId, value: v },
                        {
                          onSuccess: () => {
                            utils.gig.doesOffersMultiplePackages.invalidate();
                          },
                        },
                      );
                    }}
                  />
                </div>
              </header>
              <div className="w-full max-md:overflow-auto">
                <div className="grid w-full grid-cols-11 divide-x overflow-hidden rounded-md border border-input shadow-sm max-md:min-w-[800px]">
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
                  {/* packages */}
                  <PackageOption form={form} type="basic" />
                  <PackageOption
                    form={form}
                    disabled={!offerPackages}
                    type="standard"
                  />
                  <PackageOption
                    form={form}
                    disabled={!offerPackages}
                    type="premium"
                  />
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

interface PackageOptionProps {
  type: string;
  disabled?: boolean;
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}
const PackageOption = ({
  type,
  disabled = false,
  form,
}: PackageOptionProps) => {
  return (
    <div
      className={cn(
        "col-span-3 h-full w-full",
        disabled
          ? "pointer-events-none cursor-not-allowed select-none opacity-50"
          : "",
      )}
    >
      <header className="flex h-16 w-full items-center justify-center border-b bg-neutral-50 dark:bg-neutral-900">
        <h5 className="text-center text-base font-semibold uppercase text-muted-foreground">
          {type}
        </h5>
      </header>

      <fieldset disabled={disabled} className="grid w-full divide-y">
        <div>
          <FormField
            control={form.control}
            name={(type + ".name") as any}
            render={({ field, fieldState }) => (
              <FormItem className="flex items-center space-y-0 pr-3">
                <FormControl>
                  <textarea
                    {...field}
                    className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Name your package"
                  />
                </FormControl>

                {fieldState.error && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-full">
                        <QuestionMarkCircledIcon className="h-4 w-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-destructive text-destructive-foreground">
                      <p className="font-medium">{fieldState.error.message}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name={(type + ".description") as any}
            render={({ field, fieldState }) => (
              <FormItem className="flex items-center space-y-0 pr-3">
                <FormControl>
                  <textarea
                    {...field}
                    className="flex min-h-[80px] w-full resize-none border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Describe the details of this package"
                  />
                </FormControl>

                {fieldState.error && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-full">
                        <QuestionMarkCircledIcon className="h-4 w-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-destructive text-destructive-foreground">
                      <p className="font-medium">{fieldState.error.message}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name={(type + ".delivery") as any}
            render={({ field, fieldState }) => (
              <FormItem className="flex items-center space-y-0 pr-3">
                <FormControl>
                  <Select
                    onValueChange={(v) => field.onChange(parseInt(v))}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                      <span>
                        {!field.value
                          ? "Delivery Time"
                          : field.value === 1
                            ? "1 Day"
                            : field.value + " Days"}
                      </span>
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
                </FormControl>

                {fieldState.error && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-full">
                        <QuestionMarkCircledIcon className="h-4 w-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-destructive text-destructive-foreground">
                      <p className="font-medium">{fieldState.error.message}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name={(type + ".revisions") as any}
            render={({ field, fieldState }) => (
              <FormItem className="flex items-center space-y-0 pr-3">
                <FormControl>
                  <Select
                    onValueChange={(v) => field.onChange(parseInt(v))}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="border-none p-3 py-4 shadow-none focus:ring-0 focus-visible:ring-0">
                      <span>
                        {!field.value
                          ? "Revisions"
                          : field.value === -1
                            ? "Unlimited Revisions"
                            : field.value + " Revisions"}
                      </span>
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
                      <SelectItem value="-1">Unlimited Revisions</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                {fieldState.error && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-full">
                        <QuestionMarkCircledIcon className="h-4 w-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-destructive text-destructive-foreground">
                      <p className="font-medium">{fieldState.error.message}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name={(type + ".price") as any}
            render={({ field, fieldState }) => (
              <FormItem className="flex items-center space-y-0 pr-3">
                <FormControl>
                  <CurrencyInput
                    placeholder="Price"
                    allowNegativeValue={false}
                    className="w-full border-none bg-transparent px-3 py-2 text-sm transition-colors placeholder:text-muted-foreground  focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
                    decimalsLimit={2}
                    prefix="MAD "
                    value={field.value}
                    onValueChange={(value, name, values) => {
                      let price = values?.float;
                      field.onChange(price ?? undefined);
                    }}
                  />
                </FormControl>
                {fieldState.error && (
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="h-full">
                        <QuestionMarkCircledIcon className="h-4 w-4 text-red-500" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 bg-destructive text-destructive-foreground">
                      <p className="font-medium">{fieldState.error.message}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </FormItem>
            )}
          />
        </div>
      </fieldset>
    </div>
  );
};
