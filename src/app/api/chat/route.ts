import { getBrowser } from "@/lib/puppeteer";
import { systemMessage } from "@/services/characters";
import ChatService from "@/services/chat";
import OpenAIService from "@/services/sdk";
import type { Page } from "puppeteer";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  parts?: any[];
  toolInvocations?: any[];
  [key: string]: any; // aceita outros campos opcionais
};
let page: Page | undefined;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const simplifiedMessages = messages.map((msg: Message) => ({
      role: msg.role,
      content: msg.content,
    }));

    const browser = await getBrowser();
    page = page ? page : await browser.newPage();

    const service = new ChatService({ page, mood: systemMessage });
    service.sendMessage({ messages: simplifiedMessages });

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
