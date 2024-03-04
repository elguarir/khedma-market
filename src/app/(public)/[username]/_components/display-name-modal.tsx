"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DisplayNameChangeModalProps {
  displayName: string | null;
}

export function DisplayNameChangeModal({
  displayName,
}: DisplayNameChangeModalProps) {
  const [open, setOpen] = React.useState(false);
  const { isDesktop, isTablet } = useMediaQuery();
  if (isDesktop || isTablet) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="focus-visible:outline-primary">
          <Tooltip>
            <TooltipTrigger asChild>
              <CardTitle className="text-center hover:underline">
                {displayName}
              </CardTitle>
            </TooltipTrigger>
            <TooltipContent className="max-md:hidden">
              <p className="font-[550]">Change display name</p>
            </TooltipContent>
          </Tooltip>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Choose your display name</DialogTitle>
            <DialogDescription>
              We suggest using your first name and first initial of your last
              name.
            </DialogDescription>
          </DialogHeader>
          <div className="pt-4">
            <UpdateForm displayName={displayName} />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="focus-visible:outline-primary">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="text-center hover:underline">
              {displayName}
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-[550]">Change display name</p>
          </TooltipContent>
        </Tooltip>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            We suggest using your first name and first initial of your last
            name.
          </DrawerDescription>
        </DrawerHeader>
        <UpdateForm displayName={displayName} className="px-4 pb-4 pt-6" />
      </DrawerContent>
    </Drawer>
  );
}

interface UpdateFormProps {
  className?: string;
  displayName: string | null;
}
const formSchema = z.object({
  displayName: z
    .string()
    .min(3, "Must be at least 3 characters long.")
    .max(50, "Must be at most 50 characters long.")
    .optional(),
});

function UpdateForm({ className, displayName }: UpdateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: displayName ?? undefined,
    },
    mode: "onSubmit",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-5", className)}
      >
        <div>
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="grid gap-1">
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">I’ll do this later</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
