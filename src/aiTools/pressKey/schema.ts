import { z } from "zod";
import { KeyInput } from "./keyInputEnum";

export const pressKeyAiToolSchema = z.object({
  key: z.nativeEnum(KeyInput),
});
