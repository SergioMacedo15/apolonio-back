import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { fillSchema } from "./schema";

export class FillTool extends AiTool<typeof fillSchema> {
  description = "Fill a form field with a value.";
  schema = fillSchema;

  async execute(page: Page, input: z.infer<typeof fillSchema>): Promise<void> {
    const { selector, value } = input;

    await page.waitForSelector(selector, { visible: true });
    const element = await page.$(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    await element.type(value);
  }
}

// Instância da ferramenta para uso na aplicação
export const fillAiToolInfo = new FillTool();
