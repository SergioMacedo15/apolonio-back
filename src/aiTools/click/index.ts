import { AiToolInfo } from "..";
import { clickAiToolExecute } from "./execute";
import { clickAiToolSchema } from "./schema";

export const clickAiToolInfo: AiToolInfo<typeof clickAiToolSchema> = {
  description: "Click on a specific element",
  schema: clickAiToolSchema,
  execute: clickAiToolExecute,
};
