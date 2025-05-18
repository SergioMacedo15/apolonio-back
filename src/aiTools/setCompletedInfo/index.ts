import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";

export class SetCompletedInfoTool extends AiTool {
    description = "Aciona a exibição do WinOverlay simulando um clique no botão de vitória.";
    schema = z.object({});

    async execute(page: Page, input: z.infer<typeof this.schema>) {
        // Simula o clique no botão que abre o WinOverlay
        await page.click('[aria-label="Win Game"]');
        // Aguarda o WinOverlay aparecer na tela
        await page.waitForSelector('.fixed.inset-0', { visible: true });
        return { success: true };
    }
}

export const setCompletedInfo = new SetCompletedInfoTool();