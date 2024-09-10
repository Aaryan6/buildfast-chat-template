import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw Error("OpenAI Api Key not set");
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages: convertToCoreMessages(messages),
    system: "You are a helpful assistant.",
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toAIStreamResponse();
}
