"use client";
import * as React from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface ApplyButtonProps {
  slug: string;
}
export function ApplyButton(props: ApplyButtonProps) {
  const [open, setOpen] = React.useState(false);
  const { isDesktop, isTablet } = useMediaQuery();

  const FormSchema = z.object({
    coverLetter: z
      .string()
      .min(20, {
        message: "Must be at least 20 characters long.",
      })
      .max(500, {
        message: "Must not be longer than 500 characters.",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  let { mutate: apply, isLoading } = api.job.apply.useMutation();
  let router = useRouter();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    apply(
      {
        slug: props.slug,
        coverLetter: data.coverLetter,
      },
      {
        onSuccess: () => {
          toast.success("Application submitted successfully!");
          form.reset();
          setOpen(false);
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }

  if (isDesktop || isTablet) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full rounded-full">
            Apply now
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Job Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to apply for this job? <br />
              Please fill in the form below.
            </DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                  disabled={isLoading}
                  className="w-full space-y-2 pt-4"
                >
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about yourself"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full items-center justify-end gap-2 pt-4">
                    <DialogClose asChild>
                      <Button type="button" variant={"outline"}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      loadingText="Applying..."
                    >
                      Apply
                    </Button>
                  </div>
                </fieldset>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">
          Apply now
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Job Application</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to apply for this job?
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset
              disabled={isLoading}
              className="w-full space-y-2 px-4 pt-4"
            >
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DrawerFooter className="px-0">
                <DrawerClose asChild>
                  <Button type="button" variant={"outline"}>
                    Cancel
                  </Button>
                </DrawerClose>
                <Button
                  type="submit"
                  disabled={isLoading}
                  loadingText="Applying..."
                >
                  Apply
                </Button>
              </DrawerFooter>
            </fieldset>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
