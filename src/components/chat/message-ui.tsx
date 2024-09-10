"use client";
import { BotIcon, UserIcon } from "lucide-react";
import { MemoizedReactMarkdown } from "@/components/markdown";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const BotMessage = ({
  message,
  botImage,
  className,
}: {
  message: string;
  botImage?: string;
  className?: string;
}) => {
  return (
    <BotCard botImage={botImage}>
      <BotMarkdownMessage className={className}>{message}</BotMarkdownMessage>
    </BotCard>
  );
};

export const BotCard = ({
  children,
  botImage,
}: {
  children: React.ReactNode;
  botImage?: string;
}) => {
  return (
    <div className="flex-1 relative w-full max-w-[90%] md:max-w-[80%]">
      <div className="flex w-full justify-start gap-x-2 max-w-4xl mx-auto h-full">
        <div className="shrink-0 bg-background border overflow-hidden w-10 h-10 rounded-full grid place-items-center">
          {botImage ? (
            <div className="w-full h-full overflow-hidden rounded-full relative">
              <Image
                src={botImage}
                alt="Bot Image"
                className="absolute w-[180%] h-[180%] object-cover object-center"
                width={150}
                height={150}
                style={{
                  top: "80%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          ) : (
            <BotIcon size={18} className="" />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

const BotMarkdownMessage = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-fit grid grid-cols-1 gap-2 shadow-sm text-sm font-medium leading-5 bg-foreground text-background/80 py-1 px-4 rounded-xl rounded-ss-none",
        className
      )}
    >
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        components={{
          li: ({ children }) => (
            <li className="list-decimal ml-4">{children}</li>
          ),
          ol: ({ children }) => <ol className="list-disc ">{children}</ol>,
          h1: ({ children }) => (
            <h1 className="text-xl font-bold ">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold ">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold ">{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className="italic bg-muted px-4 rounded-md">
              {children}
            </blockquote>
          ),
          b: ({ children }) => <b className="font-bold">{children}</b>,
          a: ({ children }) => {
            return (
              <a
                className="text-background underline cursor-pointer"
                target="_blank"
              >
                {children}
              </a>
            );
          },
          p: ({ children }) => <p className="my-2">{children}</p>,
        }}
      >
        {children}
      </MemoizedReactMarkdown>
    </div>
  );
};

export const UserMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex-1 relative w-full flex flex-col items-end">
      <div className="flex w-fit justify-start gap-x-2 max-w-[90%] md:max-w-[80%]">
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 text-sm leading-5 bg-background text-foreground py-4 px-4 rounded-xl rounded-se-none whitespace-pre-wrap"
          }
        >
          {message}
        </div>
        <div className="shrink-0 bg-background text-foreground/80 border w-10 h-10 rounded-full grid place-items-center">
          <UserIcon size={18} className="" />
        </div>
      </div>
    </div>
  );
};

export const BotLoading = ({ botImage }: { botImage?: string }) => {
  return (
    <BotCard botImage={botImage}>
      <div
        className={
          "w-fit flex gap-2 font-medium text-sm leading-5 bg-white text-gray-700 pt-5 px-4 rounded-xl rounded-ss-none"
        }
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 bg-gray-800 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </BotCard>
  );
};
