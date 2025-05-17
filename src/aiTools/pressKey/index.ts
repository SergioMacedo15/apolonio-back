import { AiToolInfo } from "..";
import { pressKeyAiToolExecute } from "./execute";
import { pressKeyAiToolSchema } from "./schema";

export const pressKeyAiToolInfo: AiToolInfo<typeof pressKeyAiToolSchema> = {
  description: "Press a key on the keyboard",
  schema: pressKeyAiToolSchema,
  execute: pressKeyAiToolExecute,
};
