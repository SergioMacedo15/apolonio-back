import { getBrowser } from "@/lib/puppeteer";
import { systemMessage } from "@/services/characters";
import ChatService from "@/services/chat";
import OpenAIService from "@/services/sdk";
import type { Page } from "puppeteer";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

let page: Page | undefined;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const browser = await getBrowser();
    page = page ? page : await browser.newPage();

    const service = new ChatService({ page, mood: systemMessage });
    service.sendMessage({ messages });

    // aguarda a resposta da stream (ou timeout)
    return await service.response.toDataStreamResponse();
  } catch (error: any) {
    console.error("Erro no POST /chat:", error);

    // Se quiser tratar erro TPM específico, faça aqui:
    if (error.message.includes("TPM")) {
      return new Response(
        JSON.stringify({ error: "Erro relacionado ao TPM. Tente novamente." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Erro genérico
    return new Response(
      JSON.stringify({ error: "Erro interno no servidor." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
