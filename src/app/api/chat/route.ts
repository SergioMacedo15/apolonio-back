import { getBrowser } from "@/lib/puppeteer";
import ChatService from "@/services/chat";
import OpenAIService from "@/services/sdk";
import type { Page } from "puppeteer";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

let page: Page | undefined;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const browser = await getBrowser();

  page = page ? page : await browser.newPage();
  console.log(page);
  const service = new ChatService({ page, mood: "" });
  service.sendMessage({ messages });
  return service.response.toDataStreamResponse();
}
