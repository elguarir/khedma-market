"use client";
import React, { useState } from "react";
import { useStep } from "../utils/use-step";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import RichTextInput from "@/components/shared/richtext-input";
import { useFieldArray } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import * as Accordion from "@radix-ui/react-accordion";

import { AddNewFaq } from "./add-new-faq";
import { ChevronDownIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { DescriptionFaqSchema } from "@/schemas";
import { toast } from "sonner";

type Props = {
  step: number;
  gigId: string;
  defaultValues?: Partial<z.infer<typeof DescriptionFaqSchema>>;
};

const DescriptionFaq = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  const [addFaq, setAddFaq] = useState(false);

  let form = useForm<z.infer<typeof DescriptionFaqSchema>>({
    resolver: zodResolver(DescriptionFaqSchema),
    defaultValues: {
      description: props.defaultValues?.description,
      faq: props.defaultValues?.faq ?? [],
    },
  });
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "faq",
  });

  let { mutate: updateDescriptionFaq, isLoading } =
    api.gig.updateDescriptionFaq.useMutation();

  function onSubmit(data: z.infer<typeof DescriptionFaqSchema>) {
    updateDescriptionFaq(
      { ...data, id: props.gigId },
      {
        onSuccess: (res) => {
          console.log("res", res);
          setCurrentStep(props.step + 1);
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }

  if (props.step !== currentStep) return null;
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Description & Faq</h3>
          <p className="text-muted-foreground">Step {props.step} of 5</p>
        </div>
        <p className="text-muted-foreground">
          Add a description and frequently asked questions for your gig
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-8" disabled={isLoading}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between gap-2">
                <label>
                  <h3 className="text-lg font-semibold">
                    Frequently Asked Questions
                  </h3>
                </label>
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={() => {
                    setAddFaq(true);
                  }}
                >
                  Add FAQ
                </Button>
              </div>
              <Separator />
              {addFaq && (
                <AddNewFaq
                  onAdd={(faq) => {
                    append(faq);
                    setAddFaq(false);
                  }}
                  onCancel={() => {
                    setAddFaq(false);
                  }}
                />
              )}
              {form.watch("faq").length === 0 && !addFaq && (
                <div className="text-muted-foreground">
                  No questions have been added yet.
                </div>
              )}
              <Accordion.Root type="single" className="grid gap-2" collapsible>
                {fields.map((field, index) => (
                  <Accordion.Item
                    className="rounded-md border"
                    value={index.toString()}
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full flex-1 items-center justify-between rounded-md p-4 font-medium outline-none transition-all focus:ring-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&[data-state=open]>svg]:rotate-180">
                        {field.question}
                        <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden transition-all duration-200 ease-in-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div className="flex flex-col space-y-2 p-4">
                        <FormField
                          control={form.control}
                          name={`faq.${index}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`faq.${index}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <Button
                              variant="ghost"
                              className="text-destructive hover:text-destructive/90"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                          <Button
                            type="button"
                            onClick={() => {
                              update(index, {
                                question: form.getValues(
                                  `faq.${index}.question`,
                                ),
                                answer: form.getValues(`faq.${index}.answer`),
                              });
                            }}
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
            <Separator />
            <div className="flex items-center justify-end">
              <Button
                isLoading={isLoading}
                loadingText="Saving..."
                type="submit"
              >
                Save & Continue
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default DescriptionFaq;
