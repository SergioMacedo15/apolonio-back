import { aiTools, type AIToolsProps } from "@/aiTools";
import { openai } from "@ai-sdk/openai";
import { streamText, tool, type StreamTextResult } from "ai";
import { createStreamableValue } from "ai/rsc";

type OpenAIModel =
  | "gpt-4.1"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "gpt-4.5"
  | "gpt-4o"
  | "gpt-4o-mini"
  | "o3"
  | "o3-mini"
  | "o3-mini-high"
  | "o4-mini"
  | "o4-mini-high"
  | "gpt-image-1"
  | "whisper"
  | "whisper-large-v2"
  | "whisper-large-v3";

type RoleAPIModel = "user" | "system";

interface ContextAPIProps {
  role: RoleAPIModel;
  content: string;
}

interface SendMessageProps {
  textStream: string;
}
interface BuildStreamTextProps {
  messages: ContextAPIProps[];
  tools?: AIToolsProps; // MELHORAR ISSO AQUI
  page: any;
}

export default class OpenAIService {
  private tModel: OpenAIModel;
  private mood: string;
  public god: any;
  public stream: SendMessageProps | any;

  constructor(apiModel: OpenAIModel, mood: string) {
    this.tModel = apiModel;
    this.mood = mood;
  }

  buildStreamText({
    messages,
    tools,
    page,
  }: BuildStreamTextProps): StreamTextResult<{}, never> {
    const streamTextComponent = streamText({
      model: openai(this.tModel),
      system: this.mood,
      messages,
      tools: Object.entries(aiTools).reduce((acc, [name, info]) => {
        return {
          ...acc,
          [name]: tool({
            description: info.description,
            parameters: info.schema,
            execute: async (input) => {
              const response = await info.execute(page, input);
              console.log("executou", response);
              return response || {};
            },
          }),
        };
      }, {}),
    });

    return streamTextComponent;
  }

  async buildStreamTextCompletions({
    messages,
    tools,
    page,
  }: BuildStreamTextProps): Promise<StreamTextResult<{}, never>> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Cria objeto de tools dinamicamente
    const toolDefinitions = Object.entries(aiTools).map(([name, info]) => ({
      type: "function",
      function: {
        name,
        description: info.description,
        parameters: info.schema,
      },
    }));

    // 1. Primeira chamada: o modelo pode decidir chamar uma tool
    const first = await openai.chat.completions.create({
      model: this.tModel,
      messages,
      tools: toolDefinitions,
      tool_choice: "auto",
    });

    const toolCall = first.choices[0].message.tool_calls?.[0];

    let finalMessages = [...messages, first.choices[0].message];

    if (toolCall) {
      const { name, arguments: argsStr } = toolCall.function;
      const args = JSON.parse(argsStr);

      const toolImpl = tools[name];
      if (!toolImpl) throw new Error(`Tool '${name}' não encontrada`);

      // 2. Executa a tool (ex: Puppeteer)
      const toolResult = await toolImpl.execute(page, args);
      console.log("Executou tool:", name, toolResult);

      // 3. Injeta o retorno da tool
      finalMessages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        name,
        content:
          typeof toolResult === "string"
            ? toolResult
            : JSON.stringify(toolResult),
      });
    }

    // 4. Segunda chamada com stream: modelo finaliza o raciocínio
    const streamable = createStreamableValue();

    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: finalMessages,
      stream: true,
    });

    (async () => {
      for await (const part of stream) {
        const content = part.choices[0]?.delta?.content;
        if (content) streamable.update(content);
      }
      streamable.done();
    })();

    return {
      text: streamable.value,
    };
  }
  async streamMessage(textStream: any) {
    try {
      const stream = createStreamableValue();
      for await (const text of textStream) {
        stream.update(text);
      }
      this.stream = stream.done;
    } catch (error) {
      console.log("erro de envio de mensagem ", error);
    }
  }
}
