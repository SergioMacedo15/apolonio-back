import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
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
  message: string;
  history: ContextAPIProps[];
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

  buildStreamText({ history }: SendMessageProps) {
    const streamTextComponent = streamText({
      model: openai(this.tModel),
      system: this.mood,
      messages: history,
    });
    return { ...streamTextComponent };
  }

  async sendMessage({ message }: SendMessageProps) {
    try {
      const stream = createStreamableValue();
      for await (const text of message) {
        stream.update(text);
      }
      this.stream = stream.done;
    } catch (error) {
      console.log("erro de envio de mensagem ", error);
    }
  }
}
