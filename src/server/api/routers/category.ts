import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const CategoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ input, ctx }) => {
    let categories = await ctx.db.category.findMany({
      where: {
        parentId: null,
      },
    });
    return categories;
  }),
  getSubCategories: publicProcedure
    .input(z.object({ parentId: z.string() }))
    .query(async ({ input, ctx }) => {
      let categories = await ctx.db.category.findMany({
        where: {
          parentId: input.parentId,
        },
        include: {
          subCategories: true,
        },
      });
      return categories;
    }),
});
