"use client";
import ChatMessages from "@/components/chat/chat-messages";
import PromptBox from "@/components/chat/prompt-box";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { usePathname } from "next/navigation";
import BotInfo from "./bot-info";
import { useEffect, useState } from "react";
import { AppsTypes } from "@/lib/bots/app.types";
import { Button } from "../ui/button";

type ChatProps = {
  id: string;
  initialMessages?: Message[];
  appInfo?: AppsTypes;
};

export default function Chat({ id, initialMessages, appInfo }: ChatProps) {
  const path = usePathname();
  const [thinking, setIsThinking] = useState(false);

  const { input, handleInputChange, handleSubmit, messages, append } = useChat({
    api: `/api/app_name/chat`,
    initialMessages: initialMessages || [],
    body: {
      id,
      path,
      app_slug: appInfo?.slug,
    },
    onResponse(response) {
      if (response.status == 200) {
        setIsThinking(false);
      }
    },
  });

  useEffect(() => {
    if (messages.length === 1 && !path.includes("chat")) {
      window.history.replaceState({}, "", `${appInfo?.url}/chat/${id}`);
    }
  }, [appInfo?.url, id, messages, path]);

  const handleAppend = async (suggestion: string) => {
    append({
      role: "user",
      content: suggestion,
    });
    setTimeout(() => {
      setIsThinking(true);
    }, 1500);
  };

  return (
    <div className="relative h-[calc(100vh-3rem)] md:h-screen w-full flex flex-col px-2 md:px-4">
      <ScrollArea className="h-full w-full flex flex-col rounded-lg pr-4">
        <div className="max-w-4xl mx-auto">
          <BotInfo
            name={appInfo?.name!}
            image={appInfo?.image!}
            slug={appInfo?.slug}
          />
          <div
            className={cn(
              "mb-4 flex-1 flex flex-col gap-4 mx-auto pt-10 pb-20"
            )}
          >
            <ChatMessages
              messages={messages}
              botImage={appInfo?.image!}
              isThinking={thinking}
            />
            {appInfo?.suggestions && messages.length < 2 && (
              <div className="flex flex-wrap gap-4 justify-center py-20">
                {appInfo.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAppend(suggestion)}
                    type="button"
                    className="px-4 bg-muted-foreground py-2 rounded-full hover:scale-105 transition-all duration-200"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            <PromptBox
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              input={input}
              setIsThinking={setIsThinking}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
