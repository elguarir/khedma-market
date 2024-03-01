import { parsePhoneNumber } from "libphonenumber-js";
import z from "zod";

export const personalFormSchema = z.object({
  profilePic: z.string().optional(),
  firstName: z
    .string({ required_error: "First Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30)
    .optional(),
  lastName: z
    .string({ required_error: "Last Name is required." })
    .min(2, "Must be atleast 2 characters.")
    .max(30)
    .optional(),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email(),
  phone: z
    .string({
      required_error: "Phone number is required.",
    })
    .refine(
      (phone) => {
        let parsed = parsePhoneNumber(phone);
        if (!parsed?.isValid()) return false;
        return true;
      },
      {
        message: "Invalid phone number.",
      },
    )
    .optional(),
  dob: z.date().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  bio: z.string().optional(),
  resume: z.string().optional(),
});
