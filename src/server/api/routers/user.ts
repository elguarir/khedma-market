import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

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
});
