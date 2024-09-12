import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
  throw Error("Groq Api Key not set");
}

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama3-8b-8192"),
    messages: convertToCoreMessages(messages),
    system: ``,
    async onFinish(event) {
      // save chats here
    },
  });

  return result.toDataStreamResponse();
}
