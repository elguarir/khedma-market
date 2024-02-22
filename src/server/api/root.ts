import { createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";

export const appRouter = createTRPCRouter({
  post: profileRouter,
});

export type AppRouter = typeof appRouter;
