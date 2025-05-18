import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";

export class SetCompletedInfoTool extends AiTool {
    description = "Aciona a exibição do WinOverlay simulando um clique no botão de vitória.";
    schema = z.object({});
}

export const setCompletedInfo = new SetCompletedInfoTool();