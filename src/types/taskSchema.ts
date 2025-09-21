// src/types/taskSchema.ts
// Zod validation schema for forms
// Enforces correct types and handles transformation of date inputs

import { z } from "zod";
import { Priority, Status } from "./task";

// Custom date handling: always present but may be "" -> undefined
const dateFromLocalInput = z
  .union([z.string(), z.literal("")])
  .refine((v) => v === "" || !Number.isNaN(new Date(v).getTime()), "Invalid date")
  .transform((v) => (v === "" ? undefined : new Date(v).toISOString()));

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(120),
  description: z.string().max(2000).optional().or(z.literal("")),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
  dueDate: dateFromLocalInput, // final type: string | undefined
});

export type TaskFormValues = z.infer<typeof taskSchema>;
