import { z } from "zod";

export const clickAiToolSchema = z.object({
  selector: z.string(),
  options: z
    .object({
      clickCount: z.number().optional(),
    })
    .optional(),
});
