"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import UploadInput from "@/components/shared/upload-input";
import { Textarea } from "@/components/ui/textarea";
import { companySchema } from "@/schemas";
import { toast } from "sonner";

export default function CompanyForm() {
  let { mutate: create, isLoading } = api.user.createCompany.useMutation();
  let router = useRouter();
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      logo: "",
      industry: "",
      website: "",
      location: "",
      description: "",
      contactEmail: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof companySchema>) => {
    console.log("values", values);
    create(values, {
      onSuccess: (data) => {
        router.push("/dashboard");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isLoading} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Orange Group" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <div className="flex items-center gap-4">
                  <div className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">
                    <Popover>
                      <PopoverTrigger className="rounded-full focus-visible:outline-none">
                        <Avatar className="h-16 w-16 border-2 border-border">
                          <AvatarImage src={field.value} />
                          <AvatarFallback className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 bg-opacity-95 text-background transition-colors duration-300 hover:bg-neutral-700 dark:text-foreground dark:hover:bg-neutral-800/90">
                            <Icons.uploadIcon className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                      </PopoverTrigger>
                      <PopoverContent className="p-2" align="start">
                        <FormControl>
                          <UploadInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">
                      an image at least 256px by 256px in .jpg or .png format.
                    </span>
                  </div>
                </div>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input placeholder="Technology" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input placeholder="Agadir" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Website
                  <span className="text-muted-foreground ml-1">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
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
                    placeholder="We are a technology company..."
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="hr@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  We will send important emails to this address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center justify-end gap-2">
            <Button isLoading={isLoading} loadingText="Saving..." type="submit">
              Continue
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
