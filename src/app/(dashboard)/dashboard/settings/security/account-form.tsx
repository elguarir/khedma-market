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
import { accountFormSchema } from "@/lib/schemas/security-form";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface AccountFormProps {
  defaultValues: Partial<AccountFormValues>;
  hasPassword?: boolean;
}

export function AccountForm({ defaultValues, hasPassword }: AccountFormProps) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  let { mutate: update, isLoading } =
    api.user.updateUserSecurityInfo.useMutation();
  function onSubmit(data: AccountFormValues) {
    update(data, {
      onSuccess: (data) => {
        toast.success("Account updated successfully!");
        form.setValue("currentpassword", "");
        form.setValue("newpassword", "");
        form.setValue("confirmPassword", "");
      },
      onError(error) {
        if (error.message === "Invalid password") {
          form.setError("currentpassword", {
            type: "manual",
            message: "Invalid password.",
          });
        }

        if (error.message === "Username already taken") {
          form.setError("username", {
            type: "manual",
            message: "Username already taken.",
          });
        }
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-8" disabled={isLoading}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Username</FormLabel>
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
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Two factor authentication
                    </FormLabel>
                    <FormDescription>
                      Secure your account with two factor authentication.
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
          </div>

          <Separator />
          <div className="space-y-4">
            {hasPassword && (
              <FormField
                control={form.control}
                name="currentpassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Current password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      For security reasons, please confirm your current
                      password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* new password */}

            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    {!hasPassword &&
                      "Your account doesn't have a password yet, you can set one now."}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* confirm new password */}

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button isLoading={isLoading} loadingText="Saving..." type="submit">
            Save changes
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
