import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const profileRouter = createTRPCRouter({
  // languages
  getLanguages: publicProcedure.query(async ({ input, ctx }) => {
    let languages = ctx.db.language.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return languages;
  }),
  getUserLanguages: protectedProcedure.query(async ({ input, ctx }) => {
    return await getUserLanguages(ctx.session.user.id);
  }),
  addLanguage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        level: z.enum([
          "basic",
          "conversational",
          "fluent",
          "native_or_bilingual",
        ]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const createdLanguage = await ctx.db.userLanguages.create({
        data: {
          languageId: input.id,
          level: input.level,
          userId: ctx.session.user.id,
        },
      });
      return {
        success: true,
        user: createdLanguage,
      };
    }),
  removeLanguage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.userLanguages.delete({
        where: {
          userId_languageId: {
            userId: ctx.session.user.id,
            languageId: input.id,
          },
        },
      });
      return {
        success: true,
      };
    }),
  updateLanguage: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        level: z.enum([
          "basic",
          "conversational",
          "fluent",
          "native_or_bilingual",
        ]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedLanguage = await ctx.db.userLanguages.update({
        where: {
          userId_languageId: {
            userId: ctx.session.user.id,
            languageId: input.id,
          },
        },
        data: {
          level: input.level,
        },
      });
      return {
        success: true,
        user: updatedLanguage,
      };
    }),
  // description
  getUserDescription: protectedProcedure.query(async ({ input, ctx }) => {
    return await getUserDescription(ctx.session.user.id);
  }),

  updateUserDescription: protectedProcedure
    .input(
      z.object({
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let updatedUser = await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          description: input.description,
        },
      });
      return updatedUser;
    }),
});

export async function getUserLanguages(userId: string) {
  let userLanguages = await db.userLanguages.findMany({
    where: {
      userId,
    },
    select: {
      language: {
        select: {
          id: true,
          name: true,
          value: true,
          nativeName: true,
        },
      },
      level: true,
    },
  });
  return userLanguages.map((lan) => ({
    id: lan.language.id,
    label: lan.language.name,
    value: lan.language.value,
    nativeName: lan.language.nativeName,
    level: lan.level,
  }));
}

export async function getUserDescription(userId: string) {
  let user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      description: true,
    },
  });
  return user;
}
