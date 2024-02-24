import { createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  post: profileRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
