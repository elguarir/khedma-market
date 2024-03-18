import { socket } from "@/lib/socket";
import { ExtendedUser } from "@/server/auth";

interface sendMessageProps {
  conversationId: string;
  content: string;
  attachements: {
    name: string;
    type: string;
    url: string;
  }[];
  user: ExtendedUser;
}
export const sendMessage = async ({
  attachements,
  content,
  conversationId,
  user,
}: sendMessageProps) => {
  socket.emit("send_message", {
    conversationId: conversationId,
    content,
    attachements: attachements,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      image: user.image,
    },
  });
};
