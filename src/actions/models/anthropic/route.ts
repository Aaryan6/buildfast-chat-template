import { convertToCoreMessages, streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  throw Error("Anthropic Api Key not set");
}

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
