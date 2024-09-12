"use server";

import { streamText } from "ai";
import { createCohere } from "@ai-sdk/cohere";
import { createStreamableValue } from "ai/rsc";

const cohere = createCohere({
  apiKey: process.env.COHERE_API_KEY,
});

export async function generate(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: cohere("command-r-plus"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
