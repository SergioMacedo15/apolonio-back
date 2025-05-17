import { AiToolInfo } from "..";
import { openUrlExecute } from "./execute";
import { openUrlSchema } from "./schema";

export const openUrl: AiToolInfo<typeof openUrlSchema> = {
  schema: openUrlSchema,
  execute: openUrlExecute,
};
