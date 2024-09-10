"use client";

import { Message } from "ai";
import { BotLoading, BotMessage, UserMessage } from "./message-ui";
import { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { FileSpreadsheet } from "lucide-react";

type MessagesProps = {
  messages: Message[];
  botImage?: string;
  isThinking?: boolean;
};

export default function ChatMessages({
  messages,
  botImage,
  isThinking,
}: MessagesProps) {
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index: number) => {
        return (
          <div key={message?.id ?? index} className="my-2">
            {message.role === "assistant"
              ? message.content.length > 0 && (
                  <BotMessage botImage={botImage} message={message.content} />
                )
              : message.role === "user" && (
                  <UserMessage message={message.content} />
                )}
            <div className="flex justify-end gap-2 mt-2 pr-10">
              {message?.experimental_attachments?.map((attachment, index) => {
                if (attachment?.contentType?.startsWith("image/")) {
                  return (
                    <Image
                      key={`${message.id}-${index}`}
                      src={attachment.url}
                      width={200}
                      height={200}
                      alt={"attachment"}
                      className="rounded-md"
                    />
                  );
                } else {
                  return (
                    <div
                      key={`${message.id}-${index}`}
                      className="flex bg-muted px-4 py-2 rounded-lg items-center gap-2 max-w-sm"
                    >
                      <FileSpreadsheet size={16} className="shrink-0" />
                      <p className="text-sm truncate">{attachment.name}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      {isThinking && <BotLoading botImage={botImage} />}
      <div ref={bottomScrollRef} className="" />
    </div>
  );
}
