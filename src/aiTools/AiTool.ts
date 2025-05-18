import { ZodType, z } from "zod";
import { Page } from "puppeteer";

// Interface base para todas as ferramentas de IA
export abstract class AiTool<Schema extends ZodType = ZodType> {
  abstract description: string;
  abstract schema: Schema;
  execute?(page: Page, input: z.infer<Schema>): Promise<any>;
}

// Tipo para o registro de ferramentas
export type AIToolsRegistry = Record<string, AiTool<any>>;
