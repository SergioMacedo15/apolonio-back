import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { pressKeyAiToolSchema } from "./schema";

export class PressKeyTool extends AiTool<typeof pressKeyAiToolSchema> {
  description = "Press a key on the keyboard";
  schema = pressKeyAiToolSchema;

  async execute(
    page: Page,
    input: z.infer<typeof pressKeyAiToolSchema>
  ): Promise<void> {
    const { key } = input;

    await page.keyboard.press(key);
  }
}

// Instância da ferramenta para uso na aplicação
export const pressKeyAiToolInfo = new PressKeyTool();
