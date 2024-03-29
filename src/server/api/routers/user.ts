import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { personalFormSchema } from "@/lib/schemas/personal-info";
import { accountFormSchema } from "@/lib/schemas/security-form";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

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
  updateUserSecurityInfo: protectedProcedure
    .input(accountFormSchema)
    .mutation(async ({ input, ctx }) => {
      let user = ctx.session.user;
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          isTwoFactorEnabled: input.isTwoFactorEnabled,
        },
      });

      if (input.username && input.username !== user.username) {
        let alreadyExists = await db.user.findFirst({
          where: { username: input.username },
        });
        if (alreadyExists)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Username already taken",
            cause: { username: "Username already taken" },
          });

        return await db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            username: input.username,
          },
          select: {
            id: true,
            username: true,
            email: true,
          },
        });
      }

      if (input.newpassword && input.confirmPassword) {
        let user = await db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
          select: {
            password: true,
          },
        });

        if (!user?.password) {
          let hashedPassword = await bcrypt.hash(input.newpassword, 10);
          return await db.user.update({
            where: {
              id: ctx.session.user.id,
            },
            data: {
              password: hashedPassword,
            },
            select: {
              id: true,
              username: true,
              email: true,
            },
          });
        }

        if (user?.password && input.currentpassword) {
          let validPassword = await bcrypt.compare(
            input.currentpassword,
            user.password,
          );
          if (validPassword) {
            let hashedPassword = await bcrypt.hash(input.newpassword, 10);
            return await db.user.update({
              where: {
                id: ctx.session.user.id,
              },
              data: {
                password: hashedPassword,
              },
              select: {
                id: true,
                username: true,
                email: true,
              },
            });
          } else {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid password",
            });
          }
        }
      }
    }),
  checkUsername: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let user = await db.user.findFirst({
        where: {
          username: input.username,
          NOT: {
            id: ctx.session.user.id,
          },
        },
      });
      return {
        username: input.username,
        isTaken: user ? true : false,
      };
    }),
  updateAccount: protectedProcedure
    .input(
      z.object({
        signUpAs: z.enum(["client", "freelancer", "company"]).default("client"),
        username: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let user = await db.user.findFirst({
        where: {
          username: input.username,
          NOT: {
            id: ctx.session.user.id,
          },
        },
      });

      if (user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
          cause: { username: "Username already taken" },
        });
      }

      return await db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: input.signUpAs,
          username: input.username,
        },
        select: {
          id: true,
          role: true,
          username: true,
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

export async function getUserSecurityInfo() {
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
      username: true,
      email: true,
      password: true,
      isTwoFactorEnabled: true,
    },
  });
  return user;
}
