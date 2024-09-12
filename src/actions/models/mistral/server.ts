"use server";

import { streamText } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { createStreamableValue } from "ai/rsc";

const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generate(input: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: mistral("mistral-large-latest"),
      prompt: input,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
