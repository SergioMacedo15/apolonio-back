import { AiToolInfo } from "..";
import { fillExecute } from "./execute";
import { fillSchema } from "./schema";

export const fillAiToolInfo: AiToolInfo<typeof fillSchema> = {
  description: "Fill a form field with a value.",
  schema: fillSchema,
  execute: fillExecute,
};
