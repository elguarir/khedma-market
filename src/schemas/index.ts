import * as z from "zod";
import { role } from "@prisma/client";
import { OutputData } from "@editorjs/editorjs";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(6, {
    message: "Password needs to be at least 6 characters",
  }),
});

export const packageSchema = z.object({
  name: z
    .string()
    .min(5, "Name is too short")
    .max(20, "Name is too long")
    .optional(),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(100, "Description is too long")
    .optional(),
  revisions: z.number().int().min(1, "Revisions must be at least 1").optional(),
  delivery: z.number().int().optional(),
  price: z.number().int().min(10, "Price must be at least 10 MAD").optional(),
});

export const DescriptionFaqSchema = z.object({
  description: z
    .any({ required_error: "Description is required" })
    .refine((data: OutputData) => data && data.blocks.length > 0, {
      message: "Description is required",
    }),
  faq: z.array(
    z.object({
      question: z.string({ required_error: "Question is required" }),
      answer: z.string({ required_error: "Answer is required" }),
    }),
  ),
});

export const GallerySchema = z.object({
  images: z.array(z.string()).refine((images) => images.length > 0, {
    message: "At least one image is required",
  }),
  videos: z.array(z.string()),
  documents: z.array(z.string()),
});

export const projectSchema = z.object({
  title: z.string().min(5, "Title is too short").max(250, "Title is too long"),
  status: z.enum(["draft", "published"]).default("draft"),
  description: z
    .string()
    .min(5, "Description is too short")
    .max(2000, "Description is too long"),
  gallery: GallerySchema,
});

export const companySchema = z.object({
  name: z.string({ required_error: "Required." }).min(1, "Required.").max(250, {
    message: "Max 250 characters.",
  }),
  logo: z.string({ required_error: "Required." }).min(1, "Required."),
  industry: z
    .string({ required_error: "Required." })
    .min(1, "Required.")
    .max(250, { message: "Max 250 characters." }),
  location: z
    .string({ required_error: "Required." })
    .min(1, "Required.")
    .max(250, { message: "Max 250 characters." }),
  description: z
    .string({ required_error: "Required." })
    .min(1, "Required.")
    .max(250, { message: "Max 250 characters." }),
  contactEmail: z
    .string({ required_error: "Required." })
    .min(1, "Required.")
    .email({ message: "Invalid email." })
    .max(250, { message: "Max 250 characters." }),
  website: z
    .string()
    .max(250, { message: "A website url is not that long." })
    .optional(),
});

export const jobSchema = z.object({
  title: z.string().min(5, "Title is too short").max(250, "Title is too long"),
  description: z
    .any({ required_error: "Description is required" })
    .refine((data: OutputData) => data && data.blocks.length > 0, {
      message: "Description is required",
    }),
  location: z
    .string()
    .min(5, "Location is too short")
    .max(250, "Location is too long"),
  jobType: z.enum(["full_time", "part_time", "contract", "intern"]),
  canBeRemote: z.boolean().default(false),
  salary: z.string().optional(),
});

/**
 * 
 * model Job {
    id          String   @id @default(cuid())
    slug        String   @unique
    title       String
    description Json
    location    String
    salary      Float
    canBeRemote Boolean  @map("can_be_remote")
    companyId   String   @map("company_id")
    type        JobType
    createdAt   DateTime @default(now()) @map("created_at")
    updatedAt   DateTime @updatedAt @map("updated_at")

    applications Application[]
    company      Company       @relation(fields: [companyId], references: [id])
}

enum JobType {
    full_time
    part_time
    contract
    intern
}
 */

/**
 * 
 * model Project {
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

 */
