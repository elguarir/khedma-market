import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const profileRouter = createTRPCRouter({
  // skills
  getSkills: publicProcedure.query(async ({ input, ctx }) => {
    let skills = ctx.db.skill.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return skills;
  }),
  getUserSkills: protectedProcedure.query(async ({ input, ctx }) => {
    return await getUserSkills(ctx.session.user.id);
  }),
  addSkill: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const createdSkill = await ctx.db.userSkill.create({
        data: {
          skillId: input.id,
          level: input.level,
          userId: ctx.session.user.id,
        },
      });
      return {
        success: true,
        user: createdSkill,
      };
    }),

  removeSkill: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.userSkill.delete({
        where: {
          userId_skillId: {
            userId: ctx.session.user.id,
            skillId: input.id,
          },
        },
      });
      return {
        success: true,
      };
    }),
  updateSkill: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        level: z.enum(["beginner", "intermediate", "advanced", "expert"]),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const updatedSkill = await ctx.db.userSkill.update({
        where: {
          userId_skillId: {
            userId: ctx.session.user.id,
            skillId: input.id,
          },
        },
        data: {
          level: input.level,
        },
      });
      return {
        success: true,
        user: updatedSkill,
      };
    }),

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

/**
 *  user skills models
 * model Skill {
    id     String      @id @default(cuid())
    name   String
    status SkillStatus @default(active)

    createdAt DateTime    @default(now()) @map("created_at")
    updatedAt DateTime    @updatedAt @map("updated_at")
    users     UserSkill[]

    @@map("skills")
}

model UserSkill {
    userId  String @map("user_id")
    skill   Skill  @relation(fields: [skillId], references: [id])
    skillId String @map("skill_id")
    level   String
    user    User   @relation(fields: [userId], references: [id])

    @@id([userId, skillId])
    @@map("user_skills")
}
 * 
 */

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

export async function getUserSkills(userId: string) {
  let userSkills = await db.userSkill.findMany({
    where: {
      userId,
    },
    select: {
      skill: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
      level: true,
    },
  });
  return userSkills.map((skill) => ({
    id: skill.skill.id,
    label: skill.skill.name,
    value: skill.skill.value,
    level: skill.level,
  }));
}
