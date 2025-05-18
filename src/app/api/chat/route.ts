import { getBrowser } from "@/lib/puppeteer";
import { systemMessage } from "@/services/characters";
import OpenAIService from "@/services/sdk";
import type { Page } from "puppeteer";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

let page: Page | undefined;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const browser = await getBrowser();
  page = page ? page : await browser.newPage();
  console.log("browser", browser)
  console.log("page", page)
  console.log("messages", messages)
  const service = new OpenAIService("gpt-4.1-mini", systemMessage);

  const result = service.buildStreamText({
    messages: messages,
    page,
  });
  console.log("RESPOSTA OPEN AI", result);

  return result.toDataStreamResponse();
}
