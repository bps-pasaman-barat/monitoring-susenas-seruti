"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { type FormState, LoginFormSchema } from "@/lib/defenitions";
import { createSession, deleteSession } from "@/lib/session";

export async function login(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return {
      message: "Invalid credentials",
    };
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return {
      message: "Invalid credentials",
    };
  }

  await createSession(user.id, user.role);
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
