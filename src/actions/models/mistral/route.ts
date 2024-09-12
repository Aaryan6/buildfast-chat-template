import { convertToCoreMessages, streamText } from "ai";
import { createMistral } from "@ai-sdk/mistral";

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  throw Error("Mistral Api Key not set");
}

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: mistral("mistral-large-latest"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
