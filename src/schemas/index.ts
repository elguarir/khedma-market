import * as z from "zod";
import { role } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    role: z.enum([role.user, role.admin]),
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
  delivery: z
    .number()
    .int()
    .optional(),
  price: z.number().int().min(10, "Price must be at least 10 MAD").optional(),
});