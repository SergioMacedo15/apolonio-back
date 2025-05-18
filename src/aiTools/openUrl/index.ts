import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { openUrlSchema } from "./schema";

export class OpenUrlTool extends AiTool<typeof openUrlSchema> {
  description = "Open a URL in the browser";
  schema = openUrlSchema;

  async execute(
    page: Page,
    input: z.infer<typeof openUrlSchema>
  ): Promise<void> {
    const { url } = input;
    await page.goto(url);
  }
}

// Instância da ferramenta para uso na aplicação
export const openUrl = new OpenUrlTool();
