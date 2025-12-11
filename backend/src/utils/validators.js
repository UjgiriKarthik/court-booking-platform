import { z } from 'zod';

export const bookingPayload = z.object({
  courtId: z.string().min(1),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  coachId: z.string().optional().nullable(),
  equipment: z.array(
    z.object({
      equipmentId: z.string(),
      quantity: z.number().int().nonnegative()
    })
  ).default([])
});
