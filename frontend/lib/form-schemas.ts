import { z } from "zod";

export const BookingSchema = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string(),
});

export type BookingSchemaType = z.infer<typeof BookingSchema>;
 