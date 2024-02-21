"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { register } from "@/actions/signup";
import { RegisterSchema } from "@/schemas";
import Callout from "../ui/callout";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  let schema = RegisterSchema.pick({
    username: true,
    email: true,
    password: true,
  }).extend({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      register({
        email: values.email,
        password: values.password,
        name: `${values.firstName} ${values.lastName}`,
        username: values.username,
      }).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success)
          form.reset({
            username: "",
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          });
        router.push("/auth/sign-up?success=true");
      });
    });
  }

  useEffect(() => {
    console.log("error", error);
    console.log("success", success);
  }, [error, success]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="w-full space-y-4" disabled={isPending}>
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="flex items-center pb-3 ">
              <Callout showCloseButton variant={"danger"}>
                <ExclamationTriangleIcon className="h-4 w-4" />
                <p>{error}</p>
              </Callout>
            </div>
          )}
          <Button
            isLoading={isPending}
            loadingText="Creating account..."
            className="w-full"
            type="submit"
          >
            Create account
          </Button>
        </fieldset>
      </form>
      <p className="!mt-3 text-sm font-[450] text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </Form>
  );
}
