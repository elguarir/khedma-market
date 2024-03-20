import { Button } from "@/components/ui/button";
import { getConversationById } from "@/server/api/routers/conversation";
import { getServerAuthSession } from "@/server/auth";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import React from "react";
import SendMessageForm from "./_components/send-message-form";
import Conversation from "./_components/conversation";

type Props = {
  params: {
    id: string;
  };
};
const ConversationPage = async (props: Props) => {
  let conv = await getConversationById(props.params.id);
  let session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/auth/sign-in");
  }
  if (!conv) {
    return redirect("/dashboard/inbox");
  }

  let receiver =
    conv.receiver.id === session?.user.id ? conv.sender : conv.receiver;
  let lastMessage = conv.messages[conv.messages.length - 1];

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <header className="flex h-[68px] w-full items-center justify-between border-b bg-neutral-100/80 p-4 dark:bg-neutral-900/50">
        <div className="-space-y-0.5">
          <h3 className="text-lg font-semibold">{receiver.name}</h3>
          <p className="text-xs font-medium text-muted-foreground">
            Last seen{" "}
            {format(new Date(lastMessage?.createdAt ?? new Date()), "h:mm a")}
          </p>
        </div>
        <div>
          <Button size={"icon"} variant={"ghost"}>
            <DotsHorizontalIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <div className="flex-1 bg-neutral-100 dark:bg-neutral-800/80">
        <Conversation currentUser={session.user} conversation={conv} />
      </div>
      <footer className="border-t p-4">
        <SendMessageForm user={session.user} conversationId={conv.id} />
      </footer>
    </div>
  );
};

export default ConversationPage;
