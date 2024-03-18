import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { projectSchema } from "@/schemas";
import { db } from "@/server/db";

export const projectRouter = createTRPCRouter({
  createDraft: protectedProcedure.mutation(async ({ ctx, input }) => {
    let project = await ctx.db.project.create({
      data: {
        title: "",
        userId: ctx.session.user.id,
        description: "",
      },
    });
    return project;
  }),
  createProject: protectedProcedure
    .input(projectSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // first find the gig
      let project = await ctx.db.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      // remove the attachements from the project
      await ctx.db.attachement.deleteMany({
        where: {
          projectId: input.id,
        },
      });

      // update the project
      project = await ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
        },
      });

      let images = input.gallery.images.map((url) => {
        let name = url.split("/").pop();

        return {
          name: name ?? "Untitled",
          url,
          type: "image",
          projectId: input.id,
          userId: ctx.session.user.id,
        };
      });

      let videos = input.gallery.videos.map((url) => {
        let name = url.split("/").pop();
        return {
          url,
          name: name ?? "Untitled",
          type: "video",
          projectId: input.id,
          userId: ctx.session.user.id,
        };
      });

      let documents = input.gallery.documents.map((url) => {
        let name = url.split("/").pop();

        return {
          name: name ?? "Untitled",
          url,
          type: "document",
          projectId: input.id,
          userId: ctx.session.user.id,
        };
      });

      await ctx.db.attachement.createMany({
        data: [...images, ...videos, ...documents],
      });

      return project;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let project = await ctx.db.project.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      await ctx.db.attachement.deleteMany({
        where: {
          projectId: input.id,
        },
      });
      await ctx.db.project.delete({
        where: {
          id: input.id,
        },
      });
      return project;
    }),
});

export async function getProjectDetails(id: string, userId: string) {
  let project = await db.project.findFirst({
    where: {
      id,
      userId,
    },
  });

  let gallery = await db.attachement.findMany({
    where: {
      userId,
      projectId: id,
    },
    select: {
      type: true,
      url: true,
    },
  });
  let formattedProject = {
    ...project,
    gallery: {
      images: gallery.filter((a) => a.type === "image").map((a) => a.url),
      videos: gallery.filter((a) => a.type === "video").map((a) => a.url),
      documents: gallery.filter((a) => a.type === "document").map((a) => a.url),
    },
  };

  return formattedProject;
}

export type TGetUserProjects = Awaited<ReturnType<typeof getUserProjects>>;
export async function getUserProjects(id: string) {
  let projects = await db.project.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      userId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let formattedProjects = await Promise.all(
    projects.map(async (project) => {
      let gallery = await db.attachement.findMany({
        where: {
          userId: id,
          projectId: project.id,
        },
        select: {
          type: true,
          url: true,
        },
      });
      return {
        ...project,
        gallery: {
          images: gallery.filter((a) => a.type === "image").map((a) => a.url),
          videos: gallery.filter((a) => a.type === "video").map((a) => a.url),
          documents: gallery
            .filter((a) => a.type === "document")
            .map((a) => a.url),
        },
      };
    }),
  );
  return formattedProjects;
}

/***
 * 
 * 
 * 
 * 
 * 
//  schemas:

export const GallerySchema = z.object({
  images: z.array(z.string()).refine((images) => images.length > 0, {
    message: "At least one image is required",
  }),
  videos: z.array(z.string()),
  documents: z.array(z.string()),
});

export const projectSchema = z.object({
  title: z.string().min(5, "Title is too short").max(250, "Title is too long"),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(2000, "Description is too long"),
  gallery: GallerySchema,
});

model Project {
    id          String        @id @default(cuid())
    title       String
    description String        @db.Text
    gallery     Attachement[]
    createdAt   DateTime      @default(now()) @map("created_at")
    updatedAt   DateTime      @updatedAt @map("updated_at")
    user        User?         @relation(fields: [userId], references: [id])
    userId      String?       @map("user_id")

    @@map("projects")
}


model Attachement {
    id        String   @id @default(cuid())
    name      String
    url       String
    type      String
    userId    String?  @map("user_id")
    User      User?    @relation(fields: [userId], references: [id])
    messageId String?  @map("message_id")
    message   Message? @relation(fields: [messageId], references: [id])
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    gig       Gig?     @relation(fields: [gigId], references: [id])
    gigId     String?

    @@map("attachements")
}
 * 
 */
