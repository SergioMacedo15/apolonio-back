import { z } from "zod";

export const goBackSchema = z.object({
  waitForNavigation: z.boolean().optional().default(true),
});
