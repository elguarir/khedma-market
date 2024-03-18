"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import { api } from "@/trpc/react";
import { socket } from "@/lib/socket";
import { ExtendedUser } from "@/server/auth";
import { sendMessage } from "@/lib/socket/send-message";

const formSchema = z.object({
  message: z
    .string({
      required_error: "Message is required",
    })
    .min(1, "Message is required"),
});

interface SendMessageFormProps {
  conversationId: string;
  user: ExtendedUser;
}

export default function SendMessageForm({
  conversationId,
  user,
}: SendMessageFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendMessage({
      user: user,
      conversationId: conversationId,
      attachements: [],
      content: values.message,
    });
    form.reset({
      message: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="grid w-full gap-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    placeholder="Send message..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full items-center justify-between pl-1">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                className="text-muted-foreground transition-colors hover:text-foreground"
                size={"icon"}
                variant={"ghost"}
              >
                <Icons.sticker className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                className="text-muted-foreground transition-colors hover:text-foreground"
                size={"icon"}
                variant={"ghost"}
              >
                <Icons.attachement className="h-5 w-5" />
              </Button>
            </div>
            <div>
              <Button type="submit">Send</Button>
            </div>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
