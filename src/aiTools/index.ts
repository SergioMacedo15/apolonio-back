import { z, ZodType } from "zod";
import { openUrl } from "./openUrl";

export type AiToolInfo<Schema extends ZodType = ZodType> = {
  schema: Schema;
  execute: (input: z.infer<Schema>) => Promise<any>;
};

export const aiTools = {
  openUrl,
} as const satisfies Record<string, AiToolInfo<any>>;
