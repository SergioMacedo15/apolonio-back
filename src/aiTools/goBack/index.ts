import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { goBackSchema } from "./schema";

export class GoBackTool extends AiTool<typeof goBackSchema> {
  description = "Navigate back to the previous page";
  schema = goBackSchema;

  async execute(
    page: Page,
    input: z.infer<typeof goBackSchema>
  ): Promise<void> {
    const { waitForNavigation } = input;

    if (waitForNavigation) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.goBack(),
      ]);
    } else {
      await page.goBack();
    }
  }
}

// Instância da ferramenta para uso na aplicação
export const goBack = new GoBackTool();
