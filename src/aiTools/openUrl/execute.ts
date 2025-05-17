import { z } from "zod";
import { openUrlSchema } from "./schema";
import { Page } from "puppeteer";

export async function openUrlExecute(
  page: Page,
  input: z.infer<typeof openUrlSchema>
) {
  const { url } = input;

  await page.goto(url);
}
