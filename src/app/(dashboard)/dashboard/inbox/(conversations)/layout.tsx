import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TGetUserConversations,
  getUserConversations,
} from "@/server/api/routers/conversation";
import { getServerAuthSession } from "@/server/auth";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const InboxLayout = async ({ children }: PropsWithChildren) => {
  let session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/auth/sign-in");
  }
  let conversations = await getUserConversations(session.user.id);
  
  return (
    <main className="grid h-full w-full grid-cols-12 bg-neutral-200/20 dark:bg-neutral-800/60 xl:h-screen">
      <aside className="col-span-full hidden h-full flex-col border-r p-1 xl:col-span-3 xl:flex">
        <header className="flex items-center justify-between p-3">
          <button className="flex items-center gap-2 rounded-sm p-2 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none">
            All messages
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <button className="p-2 focus-visible:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </header>
        {conversations.map((conversation, index) => {
          let lastMessage =
            conversation.messages[conversation.messages.length - 1];
          return (
            <>
              <div className="flex flex-col space-y-2 p-2">
                <Conversation
                  key={index}
                  {...{
                    id: conversation.id,
                    receiver: conversation.receiver,
                    lastMessage: lastMessage,
                  }}
                />
              </div>
              {index !== conversations.length - 1 && <hr />}
            </>
          );
        })}
      </aside>
      <main className="col-span-full flex w-full flex-1 flex-col xl:col-span-9">
        {children}
      </main>
    </main>
  );
};

export default InboxLayout;

interface ConversationProps {
  id: string;
  receiver: TGetUserConversations[0]["receiver"];
  lastMessage: TGetUserConversations[0]["messages"][0] | undefined;
}

const Conversation = ({ id, receiver, lastMessage }: ConversationProps) => {
  return (
    <Link href={`/dashboard/inbox/${id}`}>
      <div className="flex w-full items-center gap-3 rounded-sm px-3 py-2 transition hover:bg-muted hover:shadow-sm">
        <Avatar className="h-9 w-9 border">
          <AvatarImage src={receiver.image ?? ""} />
          <AvatarFallback>{receiver.name && receiver.name[0]}</AvatarFallback>
        </Avatar>
        <div className="grid w-full grid-cols-1 gap-y-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">{receiver.name}</h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {/* relative data: eg: 12 minutes ago */}
              {formatDistance(
                new Date(lastMessage?.createdAt ?? new Date()),
                new Date(),
                {
                  addSuffix: true,
                },
              )}
            </p>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {lastMessage?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};
