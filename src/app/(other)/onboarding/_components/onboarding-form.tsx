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
import { useState } from "react";
import { api, vanilla } from "@/trpc/react";
import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  let [checking, setChecking] = useState(false);
  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 3 characters.",
      })
      .refine(
        async (value) => {
          if (!value) return false;
          setChecking(true);
          let res = await vanilla.user.checkUsername.mutate({
            username: value,
          });
          setChecking(false);
          return !res.isTaken;
        },
        {
          message: "Username is already taken.",
        },
      ),
    signUpAs: z.enum(["client", "freelancer", "company"]).default("client"),
  });

  let { mutate: update, isLoading } = api.user.updateAccount.useMutation();
  let router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      signUpAs: "client",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    update(values, {
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <div
                  className={cn(
                    "flex h-10 w-full gap-3 rounded-md border-[1.5px] border-input bg-transparent pr-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:!border-primary focus-within:outline-none hover:border-muted-foreground/50 xl:border-2",
                    (isLoading || checking) && "cursor-not-allowed opacity-50",
                  )}
                >
                  <div className="flex h-full items-center border-r-[1.5px] border-input px-3 xl:border-r-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      khedma.market/
                    </span>
                  </div>
                  <FormControl>
                    <input
                      className="peer h-full w-full outline-none focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  {checking && (
                    <div className="flex h-full items-center">
                      <span className="text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </span>
                    </div>
                  )}
                </div>
                <FormDescription>
                  Your username will be used to create your profile URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="signUpAs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sign up as</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Sign up as" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>You can change this later.</FormDescription>
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
