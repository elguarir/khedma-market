"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/server/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByUsername } from "@/lib/helpers/user";
import { sendVerificationEmail } from "@/lib/helpers/mail";
import { generateVerificationToken } from "@/lib/helpers/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name, username } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return { error: "Email already in use!" };
  }

  const usernameExists = await getUserByUsername(username);

  if (usernameExists) {
    return { error: "Username already in use!" };
  }

  await db.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
