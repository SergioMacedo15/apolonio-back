import { AiToolInfo } from "..";
import { openUrlExecute } from "./execute";
import { openUrlSchema } from "./schema";

export const openUrl: AiToolInfo<typeof openUrlSchema> = {
  description: "Open a URL in the browser",
  schema: openUrlSchema,
  execute: openUrlExecute,
};
