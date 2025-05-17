import { Page } from "puppeteer";
import { z } from "zod";
import { getPageInfoSchema } from "./schema";

export async function getPageInfoExecute(
  page: Page,
  input: z.infer<typeof getPageInfoSchema>
) {
  const content = await page.content();
  const title = await page.title();
  const url = page.url();

  return {
    title,
    url,
    content,
  };
}
