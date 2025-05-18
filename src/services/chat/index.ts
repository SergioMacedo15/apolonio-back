import { aiTools } from "@/aiTools";
import type { Page } from "puppeteer";
import OpenAIService from "../sdk";
import { MemoryStorage } from "../storage/memory";
import { getBrowser } from "@/lib/puppeteer";

type RolesAPIModel = "user" | "system";

interface ChatSession {
  page: Page;
}

export interface MessageProps {
  role: RolesAPIModel;
  content: string;
  time: string;
}

interface ChatSendMessageProps {
  chatSessionId: string;
  messages: MessageProps[];
}

interface ChatServiceProps {
  mood: string;
}

interface PersistMessageProps {
  messages: MessageProps[];
}

export default class ChatService {
  private sytemAPI;
  private static storage = new MemoryStorage<ChatSession>();
  public response: any;

  constructor({ mood }: ChatServiceProps) {
    this.sytemAPI = new OpenAIService({
      apiModel: "gpt-4.1-nano",
      mood,
      tools: aiTools,
    });
  }

  async sendMessage({ chatSessionId, messages }: ChatSendMessageProps) {
    let chatSession = ChatService.storage.getItem(chatSessionId);
    if (!chatSession) {
      const browser = await getBrowser();
      const page = await browser.newPage();

      chatSession = {
        page,
      };
      ChatService.storage.setItem(chatSessionId, chatSession);
    }

    const page = chatSession.page;

    this.response = this.sytemAPI.getStreamText({
      messages,
      page,
    });
  }
}
