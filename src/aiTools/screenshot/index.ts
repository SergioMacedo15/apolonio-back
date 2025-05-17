import { AiToolInfo } from "..";
import { screenshotExecute } from "./execute";
import { screenshotSchema } from "./schema";

export const screenshot: AiToolInfo<typeof screenshotSchema> = {
  description: "Take a screenshot of the current page",
  schema: screenshotSchema,
  execute: screenshotExecute,
};
