import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.PERPLEXITY_API_KEY;
if (!apiKey) {
  throw Error("Perplexity Api Key not set");
}

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? "",
  baseURL: "https://api.perplexity.ai/",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: perplexity("llama-3-sonar-large-32k-online"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
