import { z } from "zod";

export const CreateSignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Full name is required." })
      .max(100, { message: "Full name must be 100 characters or less." }),
    email: z
      .string()
      .min(1, { message: "Email address is required." })
      .email({ message: "Enter a valid email address." }),
    school: z
      .string()
      .max(120, { message: "School name must be 120 characters or less." })
      .optional()
      .or(z.literal("")),
    role: z.enum(["student", "teacher"], {
      message: "Select a role to continue.",
    }),
  })
  .strict();
