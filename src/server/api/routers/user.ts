import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { personalFormSchema } from "@/lib/schemas/personal-info";

export const userRouter = createTRPCRouter({
  getUserbyUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      let user = await db.user.findFirst({
        where: {
          username: input.username,
        },
        select: {
          id: true,
          username: true,
        },
      });

      return user;
    }),
  updateUserPersonalInfo: protectedProcedure
    .input(personalFormSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          ...input,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          dob: true,
          bio: true,
          country: true,
          city: true,
          address: true,
          phone: true,
          profilePic: true,
          website: true,
          resume: true,
        },
      });
    }),
});

export async function getUserPersonalInfo() {
  const session = await getServerAuthSession();
  if (!session || !session.user) {
    return null;
  }

  let user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      dob: true,
      bio: true,
      country: true,
      city: true,
      address: true,
      phone: true,
      profilePic: true,
      website: true,
      resume: true,
    },
  });
  return user;
}
