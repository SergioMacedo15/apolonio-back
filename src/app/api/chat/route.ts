import { getBrowser } from "@/lib/puppeteer";
import OpenAIService from "@/services/sdk";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { Page } from "puppeteer";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

let page: Page | undefined;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const browser = await getBrowser();
  page = page ? page : await browser.newPage();
  const service = new OpenAIService("gpt-4.1-mini", "");

  const result = service.buildStreamText({
    messages: messages,
    page,
  });
  console.log("RESPOSTA OPEN AI", result);
  const process = result.toDataStreamResponse();

  return result.toDataStreamResponse();
}
