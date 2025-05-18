import { Page } from "puppeteer";
import { z } from "zod";
import { pressKeyAiToolSchema } from "./schema";

export async function pressKeyAiToolExecute(
  page: Page,
  input: z.infer<typeof pressKeyAiToolSchema>
) {
  const { key } = input;

  await page.keyboard.press(key);
}
