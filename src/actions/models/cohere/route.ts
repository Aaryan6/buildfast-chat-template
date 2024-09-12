import { convertToCoreMessages, streamText } from "ai";
import { createCohere } from "@ai-sdk/cohere";

const apiKey = process.env.COHERE_API_KEY;
if (!apiKey) {
  throw Error("Cohere Api Key not set");
}

const cohere = createCohere({
  apiKey: process.env.COHERE_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: cohere("command-r-plus-latest"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
