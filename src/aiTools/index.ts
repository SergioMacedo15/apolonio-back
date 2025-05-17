import { z, ZodType } from "zod";
import { openUrl } from "./openUrl";

export type AIToolsProps = Record<string, AiToolInfo<any>>;

export type AiToolInfo<Schema extends ZodType = ZodType> = {
  schema: Schema;
  execute: (input: z.infer<Schema>) => Promise<any>;
};

export const aiTools = {
  openUrl,
} as const satisfies AIToolsProps;
