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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UploadField from "@/components/shared/upload-field";
import { Gauge } from "@/components/ui/gauge";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";

type Props = {
  defaultValues?: Partial<z.infer<typeof projectSchema>>;
  id: string;
};

const ProjectForm = (props: Props) => {
  let form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: props.defaultValues,
  });

  let router = useRouter();

  let { mutate: create, isLoading } = api.project.createProject.useMutation();
  function onSubmit(data: z.infer<typeof projectSchema>) {
    create(
      {
        id: props.id,
        ...data,
      },
      {
        onSuccess: (data) => {
          toast.success("Project saved successfully!");
          router.refresh();
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="w-full space-y-8" disabled={isLoading}>
          <div className="grid w-full gap-6  md:grid-cols-2 md:gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive title for your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-yellow-600" />
                            Draft
                          </div>
                        </SelectItem>
                        <SelectItem value="published">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-lime-600" />
                            Published
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    A descriptive title for your project
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="gallery.images"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Images{" "}
                  <span className="text-muted-foreground">(up to 3)</span>
                </FormLabel>
                <div className="grid min-h-56 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <UploadField
                    value={field.value}
                    maxFiles={6}
                    onChange={field.onChange}
                    notAcceptedErrorMessage="Only images are allowed"
                    accept={{ "image/*": [] }}
                    render={({
                      getInputProps,
                      getRootProps,
                      isDragActive,
                      files,
                    }) => (
                      <>
                        {field.value.map((image, index) => (
                          <div
                            key={index}
                            className="group relative h-full w-full overflow-hidden rounded-lg border shadow-sm"
                          >
                            <img
                              src={image}
                              draggable={false}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute right-0 top-0 rounded-bl-lg bg-neutral-100 p-2 text-neutral-600 opacity-0 shadow-sm transition-all duration-200 hover:bg-neutral-200 group-hover:opacity-100"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((i) => i !== image),
                                );
                              }}
                            >
                              <Icons.close className="h-6 w-4" />
                            </button>
                          </div>
                        ))}
                        {/* previews */}
                        {files.map((file) => (
                          <div
                            key={file.file.name}
                            className="relative h-full w-full overflow-hidden rounded-lg border shadow-sm"
                          >
                            <img
                              src={URL.createObjectURL(file.file)}
                              draggable={false}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex w-full items-center justify-center bg-neutral-800/50">
                              {file.progress === 100 ? (
                                <>
                                  <span className="text-sm text-neutral-100">
                                    File uploaded!
                                  </span>
                                </>
                              ) : (
                                <Gauge
                                  size="medium"
                                  value={file.progress}
                                  showValue
                                />
                              )}
                            </div>
                          </div>
                        ))}
                        {field.value.length < 6 && (
                          <div
                            className={cn(
                              "h-full min-h-56 w-full rounded-lg border-2 border-dashed p-4 shadow-sm transition-colors duration-200 hover:border-neutral-900/20 dark:hover:border-neutral-200/20",
                              isDragActive && "border-primary",
                            )}
                            {...getRootProps()}
                          >
                            <FormControl>
                              <input {...getInputProps()} />
                            </FormControl>
                            <div className="flex h-full items-center justify-center">
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Icons.image className="h-8 w-8" />
                                <p className="text-balance text-center text-sm">
                                  Drag & drop images here <br />
                                  <span className="cursor-pointer font-medium text-primary hover:underline">
                                    Select a file
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
                <FormDescription>
                  Get noticed by the right buyers with visual examples of your
                  services.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gallery.documents"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Documents{" "}
                  <span className="text-muted-foreground">(up to 2)</span>
                </FormLabel>
                <div className="grid min-h-56 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <UploadField
                    value={field.value}
                    maxFiles={2}
                    onChange={field.onChange}
                    notAcceptedErrorMessage="Only pdfs are allowed"
                    accept={{
                      "application/pdf": [],
                      "application/msword": [],
                    }}
                    render={({
                      getInputProps,
                      getRootProps,
                      isDragActive,
                      files,
                    }) => (
                      <>
                        {field.value.map((pdf, index) => (
                          <div
                            key={index}
                            className="group relative h-full min-h-60 w-full overflow-hidden rounded-lg border shadow-sm"
                          >
                            <div className="h-full w-full rounded-lg bg-neutral-50">
                              <div className="flex h-full flex-col items-center justify-center gap-2">
                                <File className="h-12 w-12" />
                                <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
                                  {pdf.split("/").pop()}{" "}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="absolute right-0 top-0 rounded-bl-lg bg-neutral-100 p-2 text-neutral-600 opacity-0 shadow-sm transition-all duration-200 hover:bg-neutral-200 group-hover:opacity-100"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((i) => i !== pdf),
                                );
                              }}
                            >
                              <Icons.close className="h-6 w-4" />
                            </button>
                          </div>
                        ))}
                        {/* previews */}
                        {files.map((file) => (
                          <div
                            key={file.file.name}
                            className="relative h-full min-h-60 w-full overflow-hidden rounded-lg border shadow-sm"
                          >
                            <div className="absolute inset-0 flex w-full items-center justify-center bg-neutral-800/50">
                              {file.progress === 100 ? (
                                <>
                                  <span className="text-sm text-neutral-100">
                                    File uploaded!
                                  </span>
                                </>
                              ) : (
                                <Gauge
                                  size="medium"
                                  value={file.progress}
                                  showValue
                                />
                              )}
                            </div>
                          </div>
                        ))}
                        {field.value.length < 2 && (
                          <div
                            className={cn(
                              "h-full min-h-56 w-full rounded-lg border-2 border-dashed p-4 shadow-sm transition-colors duration-200 hover:border-neutral-900/20 dark:hover:border-neutral-200/20",
                              isDragActive && "border-primary",
                            )}
                            {...getRootProps()}
                          >
                            <FormControl>
                              <input {...getInputProps()} />
                            </FormControl>
                            <div className="flex h-full items-center justify-center">
                              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Icons.image className="h-8 w-8" />
                                <p className="text-balance text-center text-sm">
                                  Drag & drop documents here <br />
                                  <span className="cursor-pointer font-medium text-primary hover:underline">
                                    Select a file
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  />
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[120px]"
                    placeholder="Enter project description"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A detailed description of your project, tips: mention what you
                  worked on, or helped to improve.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />
          <div className="flex items-center justify-end">
            <Button isLoading={isLoading} loadingText="Saving..." type="submit">
              Save
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};

export default ProjectForm;

/**
 * 
 * export const projectSchema = z.object({
  title: z.string().min(5, "Title is too short").max(250, "Title is too long"),
  status: z.enum(["draft", "published"]).default("draft"),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(2000, "Description is too long"),
  gallery: GallerySchema,
});

 */
