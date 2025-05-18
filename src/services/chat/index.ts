import OpenAIService from "../sdk";

type RoleAPIModel = "user" | "system";

interface ContextAPIProps {
  role: RoleAPIModel;
  content: string;
}

interface ChatSendMessageProps {
  history: ContextAPIProps[];
  message: string;
}

export default class ChatService {
  private sytemAPI;

  constructor(mood: string) {
    this.sytemAPI = new OpenAIService("gpt-4.1-mini", mood);
  }

  async sendMessage({ history, message }: ChatSendMessageProps) {
    // const { textStream } = this.sytemAPI.buildStreamText({
    //   history: history,
    //   prompt: message,
    // });
    // await this.sytemAPI.streamMessage({ textStream });
  }
}
