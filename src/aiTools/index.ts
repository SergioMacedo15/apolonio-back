import { z, ZodType } from "zod";
import { openUrl } from "./openUrl";
import { Page } from "puppeteer";

export type AIToolsProps = Record<string, AiToolInfo<any>>;

export type AiToolInfo<Schema extends ZodType = ZodType> = {
  description: string;
  schema: Schema;
  execute: (page: Page, input: z.infer<Schema>) => Promise<any>;
};

export const aiTools = {
  openUrl,
} as const satisfies AIToolsProps;
