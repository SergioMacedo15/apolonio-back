import { AiTool } from "../AiTool";
import { Page } from "puppeteer";
import { z } from "zod";
import { getPageInfoSchema } from "./schema";

export class GetPageInfoTool extends AiTool<typeof getPageInfoSchema> {
  description = "Get the page info. Example: title, url, content.";
  schema = getPageInfoSchema;

  async execute(
    page: Page,
    input: z.infer<typeof getPageInfoSchema>
  ): Promise<{
    title: string;
    url: string;
    content: string;
  }> {
    const content = await page.content();
    const title = await page.title();
    const url = page.url();

    return {
      title,
      url,
      content,
    };
  }
}

// Instância da ferramenta para uso na aplicação
export const getPageInfo = new GetPageInfoTool();
