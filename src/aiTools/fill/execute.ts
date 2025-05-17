import { Page } from "puppeteer";
import { z } from "zod";
import { fillSchema } from "./schema";

export async function fillExecute(
  page: Page,
  input: z.infer<typeof fillSchema>
) {
  const { selector, value } = input;

  await page.waitForSelector(selector, { visible: true });
  const element = await page.$(selector);
  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  await element.type(value);
}
