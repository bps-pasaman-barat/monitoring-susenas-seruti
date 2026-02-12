import * as z from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, "Username wajib diisi").trim(),
  password: z.string().min(1, "Password wajib diisi"),
});

export type FormState =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
