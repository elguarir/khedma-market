"use client";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  step: number;
};

const formSchema = z.object({
  description: z.any({ required_error: "Description is required" }),
  faq: z.array(
    z.object({
      question: z.string({ required_error: "Question is required" }),
      answer: z.string({ required_error: "Answer is required" }),
    }),
  ),
});

const DescriptionFaq = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {}

  if (props.step !== currentStep) return null;
  return (
    <>
      {" "}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Description & Faq</h3>
          <p className="text-muted-foreground">Step {props.step} of 6</p>
        </div>
        <p className="text-muted-foreground">
          Add a description and frequently asked questions for your gig
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-6" disabled={false}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end">
              <Button loadingText="Saving..." type="submit">
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
