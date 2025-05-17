import { Page } from "puppeteer";
import { z } from "zod";
import { clickAiToolSchema } from "./schema";

export async function clickAiToolExecute(
  page: Page,
  input: z.infer<typeof clickAiToolSchema>
) {
  const { selector, options } = input;

  await page.click(selector, {
    clickCount: options?.clickCount,
  });
}
