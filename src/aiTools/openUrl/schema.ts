import { z } from "zod";

export const openUrlSchema = z.object({
  url: z.string().url(),
});
