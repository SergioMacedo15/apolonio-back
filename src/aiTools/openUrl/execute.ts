import { z } from "zod";
import { openUrlSchema } from "./schema";

export async function openUrlExecute(input: z.infer<typeof openUrlSchema>) {}
