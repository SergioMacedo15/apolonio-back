import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { clickAiToolSchema } from "./schema";

export class ClickTool extends AiTool<typeof clickAiToolSchema> {
  description = "Click on a specific element";
  schema = clickAiToolSchema;

  async execute(
    page: Page,
    input: z.infer<typeof clickAiToolSchema>
  ): Promise<void> {
    const { selector, options } = input;

    await page.click(selector, {
      clickCount: options?.clickCount,
    });
  }
}

// Instância da ferramenta para uso na aplicação
export const clickAiToolInfo = new ClickTool();
