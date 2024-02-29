import { createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";
import { fileRouter } from "./routers/file";

export const appRouter = createTRPCRouter({
  post: profileRouter,
  user: userRouter,
  file: fileRouter,
});

export type AppRouter = typeof appRouter;
