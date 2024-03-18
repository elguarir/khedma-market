"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef, useState } from "react";
import { Message } from "./message";
import {
  TGetConversationById,
  TMessage,
} from "@/server/api/routers/conversation";
import { socket } from "@/lib/socket";
import { useConversation } from "@/hooks/use-messages";

type Props = {
  conversation: TGetConversationById;
};

const Conversation = ({ conversation }: Props) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { messages, setShouldScroll, shouldScroll } = useConversation(
    conversation?.id,
  );
  const scrollToBottom = () => {
    wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
    setShouldScroll(false);
  }, [shouldScroll]);

  useEffect(() => {
    scrollToBottom();
    setShouldScroll(true);
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-(68px+250px))] min-h-full lg:h-[calc(100vh-(68px+195px))]">
      <div className="h-full space-y-3 p-4">
        {messages?.map((message: TMessage) => (
          <Message
            key={message.id}
            message={{
              id: message.id,
              content: message.content,
              createdAt: message.createdAt,
            }}
            user={{
              id: message.user.id,
              name: message.user.name,
              username: message.user.username,
              email: message.user.email,
              image: message.user.image,
            }}
            attachement={message.attachements}
          />
        ))}
        <div className="!my-0 opacity-0" ref={wrapperRef} />
      </div>
    </ScrollArea>
  );
};

export default Conversation;
