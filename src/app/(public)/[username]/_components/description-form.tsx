"use client";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RouterOutput } from "@/server/api/root";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  description: z.string().optional(),
});

interface DescriptionFormProps {
  description: RouterOutput["profile"]["getUserDescription"];
}

const DescriptionForm = (props: DescriptionFormProps) => {
  let [editMode, setEditMode] = useState(false);
  let { mutate: update, isLoading: isUpdating } =
    api.profile.updateUserDescription.useMutation();
  let { data: description, isLoading } =
    api.profile.getUserDescription.useQuery(undefined, {
      initialData: props.description,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  let utils = api.useUtils();
  let refresh = () => {
    utils.profile.getUserDescription.invalidate();
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    update(values, {
      onSuccess: () => {
        refresh();
        setEditMode(false);
      },
    });
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <CardTitle className="flex w-full items-center justify-between">
            Description
            <button
              onClick={() => setEditMode(true)}
              className="text-sm font-normal text-primary hover:underline focus-visible:outline-none"
            >
              Edit description
            </button>
          </CardTitle>
        </TooltipTrigger>
        <TooltipContent align="start" className="mb-0.5">
          <p className="w-fit font-[550]">Tell us more about yourself.</p>
        </TooltipContent>
      </Tooltip>
      {editMode ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2">
            <fieldset className="grid gap-4" disabled={isUpdating}>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-2">
                <Button
                  className="w-1/2"
                  onClick={() => setEditMode(false)}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isUpdating}
                  loadingText="Saving..."
                  className="w-1/2"
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      ) : description?.description ? (
        <div>
          <p className="text-sm font-normal text-muted-foreground">
            {description.description}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-normal text-muted-foreground">
            No description set
          </p>
        </div>
      )}
    </>
  );
};

export default DescriptionForm;
