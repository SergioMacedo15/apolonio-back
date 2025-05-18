import { openai } from "@ai-sdk/openai";
import { streamText, tool, type StreamTextResult } from "ai";
import type { OpenAIModel, RoleAPIModel } from "./types";

interface ContextAPIProps {
  role: RoleAPIModel;
  content: string;
}

interface getStreamTextProps {
  messages: ContextAPIProps[];
  page: any;
}
interface OpenAIServerProps {
  apiModel: OpenAIModel;
  mood: string;
  tools: object;
}

export default class OpenAIService {
  private tModel: OpenAIModel;
  private mood: string;
  private tools: object;
  public response: any;

  constructor({ apiModel, mood, tools }: OpenAIServerProps) {
    this.tModel = apiModel;
    this.mood = mood;
    this.tools = tools;
  }

  getStreamText({
    messages,
    page,
  }: getStreamTextProps): StreamTextResult<{}, never> {
    const streamTextComponent = streamText({
      maxSteps: 10,
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
            return response || { result: "Deu boa" };
          },
        }),
      };
    }, {});
  }

  setSystem(system: string) {
    this.mood = system;
  }
}
