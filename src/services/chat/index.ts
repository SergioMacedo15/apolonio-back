import { aiTools } from "@/aiTools";
import OpenAIService from "../sdk";
import type { Page } from "puppeteer";

type RoleAPIModel = "user" | "system";

interface ContextAPIProps {
  role: RoleAPIModel;
  content: string;
}

interface ChatSendMessageProps {
  messages: ContextAPIProps[];
}

interface ChatServiceProps {
  mood: string;
  page: Page;
}

export default class ChatService {
  private sytemAPI;
  private page: Page;
  public response: any;

  constructor({ mood, page }: ChatServiceProps) {
    this.sytemAPI = new OpenAIService({
      apiModel: "gpt-4.1-nano",
      mood,
      tools: aiTools,
    });
    this.page = page;
  }

  sendMessage({ messages }: ChatSendMessageProps) {
    this.response = this.sytemAPI.getStreamText({
      messages,
      page: this.page,
    });
  }
}
