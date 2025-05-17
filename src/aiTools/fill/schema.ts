import { z } from "zod";

export const fillSchema = z.object({
  selector: z.string(),
  value: z.string(),
});
