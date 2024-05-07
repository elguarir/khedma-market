import { db } from "@/lib/db";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
});

const EVENTS = {
  CONNECTION: "connection",
  JOIN_CONVERSATION: "join_conversation",
  JOINED_CONVERSATION: "joined_conversation",
  SEND_MESSAGE: "send_message",
  NEW_MESSAGE: "new_message",
  DISCONNECT: "disconnect",
};

type SEND_MESSAGE_PAYLOAD = {
  user: {
    id: string;
    name: string | null | undefined;
    username: string;
    email: string | null | undefined;
    image: string | null | undefined;
  };
  conversationId: string;
  content: string;
  attachements: {
    type: string;
    url: string;
  }[];
};

io.on(EVENTS.CONNECTION, (socket) => {
  socket.on(
    EVENTS.JOIN_CONVERSATION,
    ({ conversationId }: { conversationId: string }) => {
      socket.join(conversationId);
      console.log(`User ${socket.id} joined conversation : ${conversationId}`);

      db.message
        .findMany({
          where: { conversationId },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            attachements: {
              select: {
                id: true,
                name: true,
                url: true,
                type: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                username: true,
                image: true,
              },
            },
          },
        })
        .then((messages) => {
          socket.emit(EVENTS.JOINED_CONVERSATION, messages);
        })
        .catch((error) => {
          console.error("Error fetching initial messages:", error);
        })
    }
  );

  socket.on(
    EVENTS.SEND_MESSAGE,
    ({ conversationId, user, content, attachements }: SEND_MESSAGE_PAYLOAD) => {
      db.message
        .create({
          data: {
            conversationId,
            userId: user.id,
            content,
            attachements: {
              createMany: {
                data: attachements.map((attachment) => ({
                  name: attachment.url.split("/").pop() || "Untitled File",
                  type: attachment.type,
                  url: attachment.url,
                })),
              },
            },
          },
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            attachements: {
              select: {
                id: true,
                name: true,
                url: true,
                type: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                username: true,
                image: true,
              },
            },
          },
        })
        .then((message) => {
          io.to(conversationId).emit(EVENTS.NEW_MESSAGE, message);
        })
        .catch((error) => {
          console.error("Error saving message:", error);
        });
    }
  );

  socket.on(EVENTS.DISCONNECT, () => {
    console.log(`User Disconnected successfully : ${socket.id}`);
  });
});


server.listen(3001, () => {
  console.log("Server running on port 3001");
});
