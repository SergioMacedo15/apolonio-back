import { AiToolInfo } from "..";
import { getPageInfoExecute } from "./execute";
import { getPageInfoSchema } from "./schema";

export const getPageInfo: AiToolInfo = {
  description: "Get the page info. Example: title, url, content.",
  schema: getPageInfoSchema,
  execute: getPageInfoExecute,
};
