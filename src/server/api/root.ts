import { createTRPCRouter } from "@/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { userRouter } from "./routers/user";
import { fileRouter } from "./routers/file";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { CategoryRouter } from "./routers/category";
import { gigRouter } from "./routers/gig";
import { projectRouter } from "./routers/project";
import { conversationRouter } from "./routers/conversation";
import { jobRouter } from "./routers/job";
import { orderRouter } from "./routers/order";

export const appRouter = createTRPCRouter({
  user: userRouter,
  file: fileRouter,
  order:orderRouter,
  profile: profileRouter,
  category: CategoryRouter,
  gig: gigRouter,
  project: projectRouter,
  conversation: conversationRouter,
  job: jobRouter,
});

export type AppRouter = typeof appRouter;

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
