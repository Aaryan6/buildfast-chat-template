"use server";

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY ?? "",
  baseURL: "https://api.perplexity.ai/",
});

export async function generate(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: perplexity("llama-3-sonar-large-32k-online"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
