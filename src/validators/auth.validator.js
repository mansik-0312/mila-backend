const { z } = require("zod");

const registerSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters")
            .max(30, "Username cannot exceed 30 characters"),

        email: z
            .email("Please enter a valid email address")
            .transform((email) => email.toLowerCase().trim()),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

module.exports = {
    registerSchema,
};