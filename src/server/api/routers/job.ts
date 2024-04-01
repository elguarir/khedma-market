import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { jobSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { db } from "@/server/db";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const jobRouter = createTRPCRouter({
  create: protectedProcedure
    .input(jobSchema)
    .mutation(async ({ ctx, input }) => {
      let company = await ctx.db.company.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You need to setup a profile company first.",
        });
      }
      let job = await ctx.db.job.create({
        data: {
          title: input.title,
          type: input.jobType,
          description: input.description,
          location: input.location,
          companyId: company.id,
          canBeRemote: input.canBeRemote,
          salary: input.salary,
          slug:
            slugify(input.title, { lower: true, strict: true, trim: true }) +
            "-" +
            nanoid(4).toLowerCase(),
        },
      });
      if (job) {
        return job;
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An error occurred while creating the job.",
      });
    }),

  update: protectedProcedure
    .input(jobSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let company = await ctx.db.company.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You need to setup a profile company first.",
        });
      }

      let job = await ctx.db.job.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          type: input.jobType,
          description: input.description,
          location: input.location,
          canBeRemote: input.canBeRemote,
          salary: input.salary,
        },
      });

      if (job) {
        return job;
      }
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "An error occurred while updating the job.",
      });
    }),
});

export async function getJobById(id: string) {
  let job = await db.job.findFirst({
    where: {
      id: id,
    },
  });

  if (!job) {
    return null;
  }

  return job;
}

export async function getUserJobs() {
  let session = await getServerAuthSession();
  if (!session || !session.user) {
    return redirect("/auth/sign-in");
  }
  let jobs = await db.job.findMany({
    where: {
      company: {
        userId: session.user.id,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      type: true,
      description: true,
      location: true,
      canBeRemote: true,
      salary: true,
      createdAt: true,
      applications: {
        select: {
          id: true,
          coverLetter: true,
          applicant: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              bio: true,
              dob: true,
              address: true,
              city: true,
              profilePic: true,
              resume: true,
              phone: true,
              email: true,
              country: true,
              username: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return jobs;
}

export async function getJobApplications(id: string) {
  let applications = await db.application.findMany({
    where: {
      jobId: id,
    },
    select: {
      id: true,
      job: {
        select: {
          id: true,
          title: true,
        },
      },
      coverLetter: true,
      applicant: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          bio: true,
          dob: true,
          address: true,
          city: true,
          profilePic: true,
          resume: true,
          phone: true,
          email: true,
          country: true,
          username: true,
          createdAt: true,
        },
      },
      createdAt: true,
    },
  });

  return applications;
}
