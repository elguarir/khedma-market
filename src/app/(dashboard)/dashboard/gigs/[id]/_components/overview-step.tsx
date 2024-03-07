"use client";
import { Button } from "@/components/ui/button";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { api, vanilla } from "@/trpc/react";
import { RouterOutputs } from "@/trpc/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useWizard } from "../utils/use-wizard";
import { useStep } from "../utils/use-step";

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

export type TOverviewStep = z.infer<typeof formSchema>;

interface OverviewStepProps {
  step: number;
  id: string;
  defaultValues?: Partial<TOverviewStep>;
}
export const OverviewStep = ({
  step,
  defaultValues,
  id,
}: OverviewStepProps) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);
  let { mutate: updateGig, isLoading } = api.gig.updateGig.useMutation();
  let form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  let setOverview = useWizard((state) => state.setOverview);

  let categories = api.category.getCategories.useQuery();
  let selectedParentCategory = form.watch("category");
  let [subCategories, setSubCategories] = useState<
    RouterOutputs["category"]["getSubCategories"] | null
  >(null);

  let [categoriesLoading, setCategoriesLoading] = useState(false);
  let [tags, setTags] = useState<Tag[]>([]);

  // show subcategories based on the parent
  useEffect(() => {
    const getSubCategories = async () => {
      if (!selectedParentCategory) return;
      form.resetField("subCategory");
      setCategoriesLoading(true);
      let data = await vanilla.category.getSubCategories.query({
        parentId: selectedParentCategory,
      });
      setSubCategories(data);
      setCategoriesLoading(false);
    };
    getSubCategories();
  }, [selectedParentCategory]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    updateGig({
      id,
      ...data,
    });

    setOverview(data);
    setCurrentStep(step + 1);
  }
  
  if (currentStep !== step) return null;

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="text-muted-foreground">Step 1 of 6</p>
        </div>
        <p className="text-muted-foreground">
          Let's start with the basics to get your gig up and running
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-6" disabled={isLoading}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="I will do something I'm really good at"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your title should be descriptive and clear, it's a great
                    place to include keywords that clients would likely use to
                    search for a service like yours.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.isLoading && (
                          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            Loading...
                          </div>
                        )}
                        {categories.data?.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the category and sub-category most suitable for
                      your Gig.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subcategory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesLoading && (
                          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            Loading...
                          </div>
                        )}
                        {!subCategories && (
                          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
                            No options.
                          </div>
                        )}
                        {subCategories?.map((category) => {
                          let subCategories = category.subCategories;
                          if (subCategories.length > 0) {
                            return (
                              <SelectGroup key={category.id}>
                                <SelectLabel>{category.name}</SelectLabel>
                                {subCategories.map((subCategory) => {
                                  return (
                                    <SelectItem
                                      key={subCategory.id}
                                      value={subCategory.id}
                                    >
                                      {subCategory.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectGroup>
                            );
                          } else {
                            return (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            );
                          }
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter tags"
                      tags={field.value ?? []}
                      className="sm:min-w-[450px]"
                      setTags={(newTags) => {
                        setTags(newTags);
                        form.setValue("tags", newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Tag your Gig with buzz words that are relevant to the
                    services you offer. Use all 5 tags to get found.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
