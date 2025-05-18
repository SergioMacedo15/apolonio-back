import { systemMessage } from "@/services/characters";
import ChatService from "@/services/chat";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  parts?: any[];
  toolInvocations?: any[];
  [key: string]: any; // aceita outros campos opcionais
};
export async function POST(req: Request) {
  try {
    const { id, messages } = await req.json();
    const simplifiedMessages = messages
      .slice(-4) // pega só os últimos 4 elementos
      .map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      }));

    const service = new ChatService({ mood: systemMessage });
    await service.sendMessage({
      chatSessionId: id,
      messages: simplifiedMessages,
    });

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
