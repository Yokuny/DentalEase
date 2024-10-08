import { z } from "zod";
import { objectIdMessage, validObjectID } from "../helpers";

export const financialSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  Doctor: z.string().refine(validObjectID, objectIdMessage()),
  Odontogram: z.string().refine(validObjectID, objectIdMessage()).optional(),
  workToBeDone: z.string().trim().optional().optional(),
  price: z.number().positive().default(0),
  status: z.enum(["pending", "paid", "canceled"]).default("pending"),
});

export type NewFinancial = z.infer<typeof financialSchema>;
