import { convertToCoreMessages, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw Error("Google Api Key not set");
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("models/gemini-1.5-flash-latest"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
