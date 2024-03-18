"use client";
import React from "react";
import { useStep } from "../utils/use-step";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
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
import UploadField from "@/components/shared/upload-field";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Gauge } from "@/components/ui/gauge";
import { Video } from "lucide-react";
import { GallerySchema } from "@/schemas";
import { api } from "@/trpc/react";

type Props = {
  step: number;
  gigId: string;
  defaultValues?: Partial<z.infer<typeof GallerySchema>>;
};

const Gallery = (props: Props) => {
  let currentStep = useStep((s) => s.step);
  let setCurrentStep = useStep((s) => s.setStep);

  let form = useForm<z.infer<typeof GallerySchema>>({
    resolver: zodResolver(GallerySchema),
    defaultValues: {
      images: props.defaultValues?.images ?? [],
      videos: props.defaultValues?.videos ?? [],
      documents: props.defaultValues?.documents ?? [],
    },
  });

  let { mutate: updateGallery, isLoading } =
    api.gig.updateGallery.useMutation();

  console.log(form.watch());
  function onSubmit(data: z.infer<typeof GallerySchema>) {
    updateGallery(
      {
        id: props.gigId,
        ...data,
      },
      {
        onSuccess: (data) => {
          console.log("res", data);
          setCurrentStep(currentStep + 1);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  }
  if (props.step !== currentStep) return null;
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Gallery</h3>
          <p className="text-muted-foreground">Step {props.step} of 5</p>
        </div>
        <p className="text-muted-foreground">
          Add images and videos to showcase your work.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="w-full space-y-8" disabled={isLoading}>
            {/* images */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Images{" "}
                    <span className="text-muted-foreground">(up to 6)</span>
                  </FormLabel>
                  <div className="grid min-h-56 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <UploadField
                      value={field.value}
                      maxFiles={3}
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
                                <Icons.close className="h-4 w-4" />
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
                          {field.value.length < 3 && (
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
                    Add images to showcase the quality of your work.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
            {/* videos */}
            <FormField
              control={form.control}
              name="videos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Videos{" "}
                    <span className="text-muted-foreground">(up to 1)</span>
                  </FormLabel>
                  <FormControl>
                    <UploadField
                      value={field.value}
                      onChange={field.onChange}
                      maxFiles={1}
                      maxSize={50 * 1024 * 1024}
                      notAcceptedErrorMessage="Only videos are allowed"
                      accept={{ "video/*": [] }}
                      render={({
                        getInputProps,
                        getRootProps,
                        isDragActive,
                        files,
                      }) => (
                        <div className="grid min-h-56 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {field.value.map((video, index) => (
                            <div
                              key={index}
                              className="group relative h-56 w-full overflow-hidden rounded-lg border shadow-sm"
                            >
                              <video
                                src={video}
                                draggable={false}
                                controls
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                className="absolute right-0 top-0 rounded-bl-lg bg-neutral-100 p-2 text-neutral-600 opacity-0 shadow-sm transition-all duration-200 hover:bg-neutral-200 group-hover:opacity-100"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter((i) => i !== video),
                                  );
                                }}
                              >
                                <Icons.close className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          {/* previews */}
                          {files.map((file) => (
                            <div
                              key={file.file.name}
                              className="relative h-56 w-full overflow-hidden rounded-lg border shadow-sm"
                            >
                              <video
                                src={URL.createObjectURL(file.file)}
                                draggable={false}
                                controls
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
                          {field.value.length < 3 && (
                            <div
                              className={cn(
                                "h-56 w-full rounded-lg border-2 border-dashed p-4 shadow-sm transition-colors duration-200 hover:border-neutral-900/20 dark:hover:border-neutral-200/20",
                                isDragActive && "border-primary",
                              )}
                              {...getRootProps()}
                            >
                              <FormControl>
                                <input {...getInputProps()} />
                              </FormControl>
                              <div className="flex h-full items-center justify-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                  <Video className="h-8 w-8" />
                                  <p className="text-balance text-center text-sm">
                                    Drag & drop videos here <br />
                                    <span className="cursor-pointer font-medium text-primary hover:underline">
                                      Select a file
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </FormControl>
                  <FormDescription>
                    Add videos to showcase your services.
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

export default Gallery;
