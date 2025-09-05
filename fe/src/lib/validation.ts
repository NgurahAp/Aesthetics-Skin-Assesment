import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    country: z.string().min(1, "Please select your country"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    aboutYourself: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerSchema = signUpSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  confirmPassword: true,
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
