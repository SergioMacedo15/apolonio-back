import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { screenshotSchema } from "./schema";

export class ScreenshotTool extends AiTool<typeof screenshotSchema> {
  description = "Take a screenshot of the current page";
  schema = screenshotSchema;

  async execute(
    page: Page,
    input: z.infer<typeof screenshotSchema>
  ): Promise<Buffer | string> {
    return (await page.screenshot()) as Buffer;
  }
}

// Instância da ferramenta para uso na aplicação
export const screenshot = new ScreenshotTool();
