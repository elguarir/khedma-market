import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export const conversationRouter = createTRPCRouter({
  getConverstion: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        otherUserId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let conversation = await getConversationWithMessages({
        byIds: {
          user1Id: input.userId,
          user2Id: input.otherUserId,
        },
      });
      if (!conversation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Conversation not found",
        });
      }
      return conversation;
    }),
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string(),
        content: z.string(),
        attachements: z.array(
          z.object({
            name: z.string(),
            url: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let message = await db.message.create({
        data: {
          content: input.content,
          conversationId: input.conversationId,
          userId: ctx.session.user.id,
        },
        include: {
          user: true,
        },
      });
      // create attachements
      if (input.attachements.length > 0) {
        await db.attachement.createMany({
          data: input.attachements.map((attachement) => ({
            messageId: message.id,
            name: attachement.name,
            type: "document",
            url: attachement.url,
          })),
        });
      }
      return message;
    }),
});

interface getConversationWithMessagesProps {
  byIds?: {
    user1Id: string;
    user2Id: string;
  };
  byUsername?: {
    user1Username: string;
    user2Username: string;
  };
}
async function getConversationWithMessages({
  byIds,
  byUsername,
}: getConversationWithMessagesProps) {
  let conversation = await db.conversation.findFirst({
    where: {
      OR: [
        {
          OR: [
            {
              senderId: byIds?.user1Id,
              receiverId: byIds?.user2Id,
            },
            {
              senderId: byIds?.user2Id,
              receiverId: byIds?.user1Id,
            },
          ],
        },
        {
          OR: [
            {
              sender: {
                username: byUsername?.user1Username,
              },
              receiver: {
                username: byUsername?.user2Username,
              },
            },
            {
              sender: {
                username: byUsername?.user2Username,
              },
              receiver: {
                username: byUsername?.user1Username,
              },
            },
          ],
        },
      ],
    },
    include: {
      messages: {
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
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    },
  });
  return conversation;
}

export async function getOrCreateConversationWithMessages(
  user1Id: string,
  user2Id: string,
) {
  let exists = await db.conversation.findFirst({
    where: {
      OR: [
        {
          senderId: user1Id,
          receiverId: user2Id,
        },
        {
          senderId: user2Id,
          receiverId: user1Id,
        },
      ],
    },
  });
  if (exists) {
    return await getConversationWithMessages({ byIds: { user1Id, user2Id } });
  }

  await db.conversation.create({
    data: {
      senderId: user1Id,
      receiverId: user2Id,
    },
  });

  return await getConversationWithMessages({ byIds: { user1Id, user2Id } });
}
export type TGetUserConversations = Awaited<
  ReturnType<typeof getUserConversations>
>;
export async function getUserConversations(userId: string) {
  let conversations = await db.conversation.findMany({
    where: {
      OR: [
        {
          senderId: userId,
        },
        {
          receiverId: userId,
        },
      ],
    },
    include: {
      messages: {
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
      },
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          image: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          image: true,
        },
      },
    },
  });
  const formattedConversations = conversations.map((conversation) => {
    const isSender = conversation.senderId === userId;

    return {
      ...conversation,
      sender: isSender ? conversation.sender : conversation.receiver,
      receiver: isSender ? conversation.receiver : conversation.sender,
      messages: conversation.messages.map((message) => ({
        ...message,
        user:
          message.user.id === userId
            ? message.user
            : {
                id: conversation.senderId,
                name: conversation.sender.name,
                email: conversation.sender.email,
                username: conversation.sender.username,
                image: conversation.sender.image,
              },
      })),
    };
  });

  return formattedConversations;
}
export type TGetConversationById = Awaited<
  ReturnType<typeof getConversationById>
>;

export async function getConversationById(id: string) {
  let conversation = await db.conversation.findFirst({
    where: {
      id,
    },
    include: {
      messages: {
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
      },
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          image: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          image: true,
        },
      },
    },
  });

  return conversation;
}
export type TMessage = Prisma.MessageGetPayload<{
  select: {
    id: true;
    content: true;
    createdAt: true;
    updatedAt: true;
    attachements: {
      select: {
        id: true;
        name: true;
        url: true;
        type: true;
      };
    };
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        username: true;
        image: true;
      };
    };
  };
}>;

/**
 * 
 * model Message {
    id             String        @id @default(cuid())
    content        String        @db.Text
    conversationId String        @map("conversation_id")
    user           User?         @relation(fields: [userId], references: [id])
    userId         String?       @map("user_id")
    createdAt      DateTime      @default(now()) @map("created_at")
    updatedAt      DateTime      @updatedAt @map("updated_at")
    attachements   Attachement[]
    conversation   Conversation  @relation(fields: [conversationId], references: [id])

    @@map("messages")
}

model Conversation {
    id         String    @id @default(cuid())
    createdAt  DateTime  @default(now()) @map("created_at")
    updatedAt  DateTime  @updatedAt @map("updated_at")
    senderId   String    @map("sender_id")
    receiverId String    @map("receiver_id")
    users      User[]    @relation("UserConversation")
    messages   Message[]

    @@map("conversations")
}

model Attachement {
    id        String   @id @default(cuid())
    name      String
    url       String
    type      String
    userId    String?  @map("user_id")
    user      User?    @relation(fields: [userId], references: [id])
    messageId String?  @map("message_id")
    message   Message? @relation(fields: [messageId], references: [id])
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")
    project   Project? @relation(fields: [projectId], references: [id])
    projectId String?  @map("project_id")

    @@map("attachements")
}
 */
