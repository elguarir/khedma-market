import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { DescriptionFaqSchema, GallerySchema, packageSchema } from "@/schemas";

export const gigRouter = createTRPCRouter({
  createDraft: protectedProcedure.mutation(({ ctx }) => {
    return createDraft(ctx.session.user.id);
  }),
  updateOverview: protectedProcedure
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
  createPackages: protectedProcedure
    .input(
      z.object({
        basic: packageSchema.required(),
        standard: packageSchema.optional(),
        premium: packageSchema.optional(),
        gigId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let basic = input.basic;
      let standard = input.standard;
      let premium = input.premium;
      let standardExists = Object.values(standard ?? {}).every(
        (v) => v !== undefined,
      );
      let premiumExists = Object.values(premium ?? {}).every(
        (v) => v !== undefined,
      );

      let basicPackage;
      let standardPackage;
      let premiumPackage;
      let gig = await ctx.db.gig.findUnique({
        where: {
          id: input.gigId,
        },
      });

      if (!gig) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Gig not found",
        });
      }

      basicPackage = await ctx.db.package.upsert({
        where: { gigId_type: { gigId: input.gigId, type: "basic" } },
        update: {
          name: basic.name,
          description: basic.description,
          price: basic.price,
          delivery: basic.delivery,
          revisions: basic.revisions,
        },
        create: {
          name: basic.name,
          description: basic.description,
          price: basic.price,
          delivery: basic.delivery,
          revisions: basic.revisions,
          type: "basic",
          gigId: input.gigId,
        },
      });

      if (standard && standardExists) {
        standardPackage = await ctx.db.package.upsert({
          where: { gigId_type: { gigId: input.gigId, type: "standard" } },
          update: {
            name: standard.name!,
            description: standard.description!,
            price: standard.price!,
            delivery: standard.delivery!,
            revisions: standard.revisions!,
          },
          create: {
            name: standard.name!,
            description: standard.description!,
            price: standard.price!,
            delivery: standard.delivery!,
            revisions: standard.revisions!,
            type: "standard",
            gigId: input.gigId,
          },
        });
      }
      if (premium && premiumExists) {
        premiumPackage = await ctx.db.package.upsert({
          where: { gigId_type: { gigId: input.gigId, type: "premium" } },
          update: {
            name: premium.name!,
            description: premium.description!,
            price: premium.price!,
            delivery: premium.delivery!,
            revisions: premium.revisions!,
          },
          create: {
            name: premium.name!,
            description: premium.description!,
            price: premium.price!,
            delivery: premium.delivery!,
            revisions: premium.revisions!,
            type: "premium",
            gigId: input.gigId,
          },
        });
      }

      return {
        basic: basicPackage,
        standard: standardPackage,
        premium: premiumPackage,
      };
    }),
  doesOffersMultiplePackages: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await doesOffersMultiplePackages(input.id);
    }),
  udpateOffersMultiplePackages: protectedProcedure
    .input(z.object({ id: z.string(), value: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.gig.update({
        where: {
          id: input.id,
        },
        data: {
          offersMultiplePackages: input.value,
        },
      });
    }),
  updateDescriptionFaq: protectedProcedure
    .input(DescriptionFaqSchema.extend({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let gig = await ctx.db.gig.findUnique({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
      });
      if (!gig)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "This is not found!",
        });

      let updatedGig = await ctx.db.gig.update({
        where: {
          id: input.id,
        },
        data: {
          description: input.description,
        },
      });

      await ctx.db.gigFaq.deleteMany({
        where: {
          gigId: input.id,
        },
      });

      let faq = await ctx.db.gigFaq.createMany({
        data: input.faq,
      });

      return {
        success: true,
        description: updatedGig.description,
        faq: faq.count,
      };
    }),
  updateGallery: protectedProcedure
    .input(GallerySchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let gig = await ctx.db.gig.findUnique({
        where: {
          id: input.id,
          ownerId: ctx.session.user.id,
        },
      });
      if (!gig)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "This is not found!",
        });
      let attachements = [];
      for (let image of input.images) {
        // https://khedma-market.s3.amazonaws.com/dcda736d-d0cc-436f-9bed-89e460d73ecd/1_-Lvx1Z0lKBn1xQGX-_2B0Q.webp
        let name = image.split("/").pop();
        let attache = await ctx.db.attachement.create({
          data: {
            name: name!,
            url: image,
            type: "image",
            gigId: input.id,
            userId: ctx.session.user.id,
          },
        });
        attachements.push(attache);
      }

      return {
        success: true,
        images: attachements,
      };
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

export type TGetGigPackages = Awaited<ReturnType<typeof getGigPackages>>;
export async function getGigPackages(id: string) {
  let basicPackage = await db.package.findFirst({
    where: {
      gigId: id,
      type: "basic",
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      delivery: true,
      revisions: true,
    },
  });
  let standardPackage = await db.package.findFirst({
    where: {
      gigId: id,
      type: "standard",
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      delivery: true,
      revisions: true,
    },
  });
  let premiumPackage = await db.package.findFirst({
    where: {
      gigId: id,
      type: "premium",
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      delivery: true,
      revisions: true,
    },
  });

  return {
    basic: basicPackage ?? undefined,
    standard: standardPackage ?? undefined,
    premium: premiumPackage ?? undefined,
  };
}

export type TOffersMultiplePackages = Awaited<
  ReturnType<typeof doesOffersMultiplePackages>
>;
export async function doesOffersMultiplePackages(id: string) {
  let gig = await db.gig.findFirst({
    where: {
      id,
    },
    select: {
      offersMultiplePackages: true,
    },
  });

  return gig?.offersMultiplePackages;
}

/***
 * 
 * model Gig {
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
model Package {
    id          String      @id @default(cuid())
    name        String
    price       Float
    description String
    delivery    Int
    revision    Int
    createdAt   DateTime    @default(now()) @map("created_at")
    updatedAt   DateTime    @updatedAt @map("updated_at")
    type        PackageType
    gig         Gig?        @relation(fields: [gigId], references: [id])
    gigId       String?     @map("gig_id")
    orders      Order[]

    @@map("packages")
}

model Attachement {
    id        String   @id @default(cuid())
    name      String
    url       String
    type      String
    userId    String?  @map("user_id")
    User      User?    @relation(fields: [userId], references: [id])
    messageId String?  @map("message_id")
    message   Message? @relation(fields: [messageId], references: [id])
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?

    @@map("attachements")
}
    model GigFaq {
    id        String   @id @default(cuid())
    question  String
    answer    String
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?  @map("gig_id")

    @@map("gig_faqs")
}
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
