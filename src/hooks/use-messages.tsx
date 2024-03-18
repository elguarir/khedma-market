import { socket } from "@/lib/socket";
import { TMessage } from "@/server/api/routers/conversation";
import { useEffect, useState } from "react";
import { create } from "zustand";

type Store = {
  messages: TMessage[];
  setMessages: (messages: TMessage[]) => void;
  addMessage: (message: TMessage) => void;
};

export const useMessages = create<Store>()((set, get) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message: TMessage) => {
    const messages = get().messages;
    set({ messages: [...messages, message] });
  },
}));

export const useConversation = (conversationId: string | undefined) => {
  const messages = useMessages((state) => state.messages);
  const setMessages = useMessages((state) => state.setMessages);
  const addMessage = useMessages((state) => state.addMessage);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    socket.emit("join_conversation", { conversationId });
    socket.on("joined_conversation", (initialMessages: TMessage[]) => {
      setMessages(initialMessages);
    });

    return () => {
      socket.off("JOINED_CONVERSATION");
    };
  }, [conversationId]);

  // new messages
  useEffect(() => {
    socket.on("new_message", (message: TMessage) => {
      addMessage(message);
    });

    socket.on("new_message", () => {
      setShouldScroll(true);
    });

    socket.on("send_message", () => {
      setShouldScroll(true);
    });

    return () => {
      socket.off("new_message");
      socket.off("send_message");
    };
  }, []);

  return { messages, shouldScroll, setShouldScroll };
};
