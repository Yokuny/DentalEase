import { z } from "zod";
import { objectIdMessage, validObjectID, priceMessage } from "../helpers";

export const financialSchema = z.object({
  Patient: z.string().refine(validObjectID, objectIdMessage()),
  Doctor: z.string().refine(validObjectID, objectIdMessage()),
  Odontogram: z.string().refine(validObjectID, objectIdMessage()).optional(),
  procedures: z
    .array(
      z.object({
        procedure: z.string().max(250),
        price: z.number(),
        status: z.enum(["pending", "paid", "canceled"]),
      })
    )
    .optional(),
  status: z.enum(["pending", "paid", "canceled"]).default("pending"),
});

export const procedureSchema = z.object({
  procedure: z.string().max(250),
  price: z.coerce.number(),
  status: z.enum(["pending", "paid", "canceled"]),
});

export const financialStatusSchema = z.object({
  status: z.enum(["pending", "partial", "paid", "refund", "canceled"]).default("pending"),
});

export type FinancialStatus = z.infer<typeof financialStatusSchema>;
export type NewFinancial = z.infer<typeof financialSchema>;
export type NewProcedure = z.infer<typeof procedureSchema>;
