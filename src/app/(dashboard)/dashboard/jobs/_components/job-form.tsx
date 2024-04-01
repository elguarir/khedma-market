"use client";
import React from "react";
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
import { Separator } from "@/components/ui/separator";
import { jobSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { job_types } from "@/lib/constants/jobtypes";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  mode?: "create" | "edit";
  initialData?: z.infer<typeof jobSchema>;
  id?: string;
};

const JobForm = ({ mode = "create", id, initialData }: Props) => {
  let form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: { ...initialData, description: initialData?.description ?? initial_instructions},
  });

  let router = useRouter();
  let { mutate: create, isLoading } = api.job.create.useMutation();
  let { mutate: update, isLoading: iUpdating } = api.job.update.useMutation();
  function onSubmit(data: z.infer<typeof jobSchema>) {
    if (mode === "edit" && id) {
      update(
        { id: id, ...data },
        {
          onSuccess: () => {
            toast.success("Job updated successfully!");
            router.push("/dashboard/jobs");
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
      return;
    }
    create(data, {
      onSuccess: () => {
        toast.success("Job posted successfully!");
        router.push("/dashboard/jobs");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          {/* <h3 className="text-lg font-semibold">Description & Faq</h3> */}
        </div>
        {/* <p className="text-muted-foreground">
          Add a description and frequently asked questions for your gig
        </p> */}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            className="w-full space-y-8"
            disabled={isLoading || iUpdating}
          >
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Web App Designer" {...field} />
                    </FormControl>
                    <FormDescription>
                      Descriptive title for the job/position
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Eg: Agadir" {...field} />
                    </FormControl>
                    <FormDescription>
                      The location where the applicant will work
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormDescription>
                    Detailed description of the job/position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Job Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(job_types).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Salary{" "}
                      <span className="font-medium text-muted-foreground">
                        (Optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="7,000 MAD - 9,000 MAD" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="canBeRemote"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div>
                    <FormLabel>Can be remote</FormLabel>
                    <FormDescription>
                      Wether the job can be done remotely (remote friendly).
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <div className="flex items-center justify-end">
              <Button
                isLoading={isLoading || iUpdating}
                loadingText={mode === "edit" ? "Updating..." : "Creating..."}
                type="submit"
              >
                {mode === "edit" ? "Update" : "Create"}
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </>
  );
};

export default JobForm;

const initial_instructions = {
  time: 1711915936127,
  blocks: [
    {
      id: "JzD_4M6hhJ",
      type: "header",
      data: {
        text: "The Role",
        level: 2,
      },
    },
    {
      id: "ixEzWnrM4C",
      type: "paragraph",
      data: {
        text: "Clearly outline the responsibilities and expectations for the role. Candidates should have a clear understanding of what their day-to-day tasks will entail.",
      },
    },
    {
      id: "ioNie9CJYT",
      type: "paragraph",
      data: {
        text: "Emphasize how the role contributes to broader company initiatives. Candidates want to know how their work will make a difference.",
      },
    },
    {
      id: "J4ixiVCieu",
      type: "paragraph",
      data: {
        text: "Mention the collaborative nature of the role. Candidates value opportunities to work alongside other team members, including engineers, designers, and product managers.",
      },
    },
    {
      id: "jtF6wZNUGS",
      type: "header",
      data: {
        text: "About You",
        level: 2,
      },
    },
    {
      id: "ITJC4gb8t3",
      type: "paragraph",
      data: {
        text: "Specify the technical skills and experience required for the position. This helps attract candidates who possess the necessary qualifications.",
      },
    },
    {
      id: "9x4fsFyyV7",
      type: "paragraph",
      data: {
        text: "Highlight the importance of a genuine passion for building software. Candidates who are enthusiastic about their work tend to be more engaged and motivated.",
      },
    },
    {
      id: "YbouG0L1Rs",
      type: "paragraph",
      data: {
        text: "Emphasize the need for candidates who are eager to learn and adapt to new technologies. This indicates a willingness to grow and evolve with the company.",
      },
    },
    {
      id: "iStgnAWyWj",
      type: "header",
      data: {
        text: "Things You Might Do",
        level: 2,
      },
    },
    {
      id: "Pgi6J2s8ir",
      type: "paragraph",
      data: {
        text: "Mention the diverse range of projects candidates will work on. This provides insight into the potential for professional growth and exposure to different technologies.",
      },
    },
    {
      id: "QzPLaUkeK-",
      type: "paragraph",
      data: {
        text: "Describe how candidates will interact with internal and external stakeholders, including clients. This showcases the candidate's potential to represent the company's values and build strong relationships.",
      },
    },
  ],
  version: "2.29.0",
};
