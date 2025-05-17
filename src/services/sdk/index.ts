import { openai } from "@ai-sdk/openai";

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

interface SendMessageProps {
  message: string;
}

class OpenAIService {
  private tModel: OpenAIModel;
  public god;
  constructor(apiModel: OpenAIModel) {
    this.tModel = apiModel;
  }

  buildModel() {}

  sendMessage({ message }: SendMessageProps) {}
}
