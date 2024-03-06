import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";

export const gigRouter = createTRPCRouter({
  createDraft: protectedProcedure.mutation(({ ctx }) => {
    return createDraft(ctx.session.user.id);
  }),
  updateGig: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        subCategory: z.string(),
        tags: z.array(z.object({ id: z.string(), text: z.string() })),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let gig = await ctx.db.gig.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!gig) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gig not found",
        });
      }
      // disconnect all tags
      await ctx.db.gigTag.deleteMany({
        where: {
          gigId: input.id,
        },
      });
      return await ctx.db.gig.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          category: {
            connect: {
              id: input.subCategory,
            },
          },
          tags: {
            create: input.tags.map((tag) => ({
              id: tag.id,
              name: tag.text,
            })),
            connect: input.tags.map((tag) => ({
              id: tag.id,
            })),
          },
        },
      });
    }),
});

export async function createDraft(userId: string) {
  return await db.gig.create({
    data: {
      ownerId: userId,
    },
  });
}

// gigs
export async function getGigById(id: string) {
  return await db.gig.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      status: true,
      category: {
        select: {
          id: true,
          name: true,
          parentId: true,
        },
      },
      tags: true,
      packages: true,
      createdAt: true,
      faqs: true,
      attachments: {
        select: {
          id: true,
          name: true,
          url: true,
          type: true,
        },
      },
    },
  });
}

/***
 * id          String        @id @default(cuid())
    title       String?
    slug        String?       @unique
    description Json?
    status      String        @default("draft")
    ownerId     String        @map("owner_id")
    categoryId  String?       @map("category_id")
    createdAt   DateTime      @default(now()) @map("created_at")
    updatedAt   DateTime      @updatedAt @map("updated_at")
    packages    Package[]
    category    Category?     @relation(fields: [categoryId], references: [id])
    owner       User          @relation(fields: [ownerId], references: [id])
    attachments Attachement[]
    reviews     Review[]
    tags        GigTag[]
    faqs        GigFaq[]
    orders      Order[]

    @@map("gigs")

    
model GigTag {
    id        String   @id @default(cuid())
    name      String
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")

    @@map("gig_tags")
}
 * 
 */
