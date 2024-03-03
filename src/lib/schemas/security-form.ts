import z from "zod";
export const accountFormSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required." })
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      })
      .optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    currentpassword: z
      .string({ required_error: "Password is required." })
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      })
      .optional(),
    newpassword: z
      .string({ required_error: "Password is required." })
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(30, {
        message: "Password must not be longer than 30 characters.",
      })
      .optional(),
    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .min(6, {
        message: "Confirm password must be at least 6 characters.",
      })
      .optional(),
  })
  .refine((data) => data.newpassword === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
