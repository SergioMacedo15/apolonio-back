import { z, ZodType } from "zod";
import { openUrl } from "./openUrl";
import { Page } from "puppeteer";
import { screenshot } from "./screenshot";
import { getPageInfo } from "./getPageInfo";
import { fillAiToolInfo } from "./fill";
import { clickAiToolInfo } from "./click";
import { pressKeyAiToolInfo } from "./pressKey";

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
  fill: fillAiToolInfo,
  click: clickAiToolInfo,
  pressKey: pressKeyAiToolInfo,
} as const satisfies AIToolsProps;
