import { aiTools, type AIToolsProps } from "@/aiTools";
import { openai } from "@ai-sdk/openai";
import { streamText, tool, type StreamTextResult } from "ai";
import { createStreamableValue } from "ai/rsc";
import type { OpenAIModel, RoleAPIModel } from "./types";

interface ContextAPIProps {
  role: RoleAPIModel;
  content: string;
}

interface SendMessageProps {
  textStream: string;
}
interface BuildStreamTextProps {
  messages: ContextAPIProps[];
  page: any;
}

export default class OpenAIService {
  private tModel: OpenAIModel;
  private mood: string;
  public god: any;
  public stream: SendMessageProps | any;
  private tools: object;

  constructor(apiModel: OpenAIModel, mood: string, tools: object) {
    this.tModel = apiModel;
    this.mood = mood;
    this.tools = tools;
  }

  buildStreamText({
    messages,
    page,
  }: BuildStreamTextProps): StreamTextResult<{}, never> {
    const streamTextComponent = streamText({
      model: openai(this.tModel),
      system: this.mood,
      messages,
      tools: this.buildToolsComponente(page),
    });

    return streamTextComponent;
  }

  buildToolsComponente(page: any) {
    return Object.entries(this.tools).reduce((acc, [name, info]) => {
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
    }, {});
  }

  setSystem(system: string) {
    this.mood = system;
  }
}
