import { aiTools } from "@/aiTools";
import OpenAIService from "../sdk";
import type { Page } from "puppeteer";
import type { IStorage } from "../storage/base";
import { SessionStorage } from "../storage/session";

type RolesAPIModel = "user" | "system";

export interface MessageProps {
  role: RolesAPIModel;
  content: string;
  time: string;
}

interface ChatSendMessageProps {
  messages: MessageProps[];
}

interface ChatServiceProps {
  mood: string;
  page: Page;
}

interface PersistMessageProps {
  messages: MessageProps[];
}

export default class ChatService {
  private sytemAPI;
  private page: Page;
  private storage: IStorage;
  public response: any;

  constructor({ mood, page }: ChatServiceProps) {
    this.sytemAPI = new OpenAIService({
      apiModel: "gpt-4.1",
      mood,
      tools: aiTools,
    });
    this.storage = new SessionStorage();
    this.page = page;
  }

  // persistMessage({ messages }: PersistMessageProps) {
  //   this.storage.setItem("chat-vovo", messages);
  // }

  sendMessage({ messages }: ChatSendMessageProps) {
    this.response = this.sytemAPI.getStreamText({
      messages,
      page: this.page,
    });
  }
}
