"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";
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
import { Textarea } from "@/components/ui/textarea";
import { vanilla } from "@/trpc/react";
import PhoneInput from "@/components/ui/phone-input";

const profileFormSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30),
  lastName: z
    .string({ required_error: "Last Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30),
  username: z
    .string({ required_error: "Username is required." })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .refine(async (value) => {
      let user = await vanilla.user.getUserbyUsername.query({
        username: value,
      });
      if (user) {
        return "Username already exists.";
      }
      return true;
    }),
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .refine((phone) => {})
    .optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onBlur",
  });

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  function onSubmit(data: ProfileFormValues) {
    console.log("data", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription className="col-span-2">
            This is your account name not your display name.
          </FormDescription>
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your username and cannot be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is your primary email and cannot be changed, it will also
                to contact you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  autoComplete={"false"}
                  aria-autocomplete="none"
                />
              </FormControl>
              <FormDescription>
                This phone number will be used to contact you when applying to
                job offers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>This</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))} */}
        <Button type="submit">Save changes</Button>
      </form>
    </Form>
  );
}
