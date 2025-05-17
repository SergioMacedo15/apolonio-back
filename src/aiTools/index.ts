import { z, ZodType } from "zod";
import { openUrl } from "./openUrl";
import { Page } from "puppeteer";
import { screenshot } from "./screenshot";
import { getPageInfo } from "./getPageInfo";

export type AIToolsProps = Record<string, AiToolInfo<any>>;

export type AiToolInfo<Schema extends ZodType = ZodType> = {
  description: string;
  schema: Schema;
  execute: (page: Page, input: z.infer<Schema>) => Promise<any>;
};

export const aiTools = {
  openUrl,
  screenshot,
  getPageInfo,
} as const satisfies AIToolsProps;
