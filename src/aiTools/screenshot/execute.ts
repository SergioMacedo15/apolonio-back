import { Page } from "puppeteer";
import { z } from "zod";
import { screenshotSchema } from "./schema";

export function screenshotExecute(
  page: Page,
  input: z.infer<typeof screenshotSchema>
) {
  return page.screenshot();
}
