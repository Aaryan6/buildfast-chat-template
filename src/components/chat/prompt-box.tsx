"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Forward, Paperclip } from "lucide-react";
import { Input } from "../ui/input";
import { useRef, useState, useEffect } from "react";
import { ChatRequestOptions } from "ai";
import { Label } from "../ui/label";
import Image from "next/image";

type PromptBoxProps = {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  setIsThinking?: (isThinking: boolean) => void;
};

export default function PromptBox({
  handleInputChange,
  handleSubmit,
  input,
  setIsThinking,
}: PromptBoxProps) {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmitWithAttachments(e);
    }
  };

  const handleSubmitWithAttachments = (e: any) => {
    e.preventDefault();
    handleSubmit(e, {
      experimental_attachments: files,
    });
    setFiles(undefined);
    setPreviews([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setTimeout(() => {
      setIsThinking && setIsThinking(true);
    }, 1500);
  };

  useEffect(() => {
    if (files) {
      const newPreviews = Array.from(files).map((file) => {
        if (file.type.startsWith("image/")) {
          return URL.createObjectURL(file);
        }
        return "";
      });
      setPreviews(newPreviews);

      return () => {
        newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }
  }, [files]);

  return (
    <div className="absolute bottom-4 inset-x-0 w-full max-w-4xl mx-auto bg-background rounded-full">
      {files && (
        <div className="absolute -top-36 left-2 flex flex-col gap-2 bg-background px-2 py-1 rounded-lg">
          <div className="flex gap-2">
            {previews.map((preview, index) =>
              preview ? (
                <Image
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-md object-cover w-[6rem] h-[6rem]"
                />
              ) : (
                <div
                  key={index}
                  className="w-[6rem] h-[6rem] bg-gray-200 rounded-md flex items-center justify-center text-xs"
                >
                  {files[index].name.split(".").pop()?.toUpperCase()}
                </div>
              )
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {previews.length} files selected
          </p>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitWithAttachments(e);
        }}
        className="relative rounded-full"
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-2">
          <Label
            htmlFor="file"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "cursor-pointer w-8 h-8 rounded-full"
            )}
          >
            <Paperclip size={16} />
          </Label>
        </div>
        <Input
          type="file"
          className="absolute top-5 left-5 w-fit hidden"
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          id="file"
          multiple
          ref={fileInputRef}
          accept="image/*"
        />
        <Input
          className={cn(
            "w-full resize-none h-full focus:outline-none focus:ring-2 focus:ring-muted dark:focus:ring-muted focus-visible:ring-0 focus-visible:ring-offset-0 py-5 px-5 pl-12 border-0 bg-transparent"
          )}
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          spellCheck={true}
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
        <Button
          className="absolute top-1/2 -translate-y-1/2 right-3 px-2 bg-foreground hover:text-background hover:bg-foreground/80 text-background focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 rounded-full"
          size="sm"
          type="submit"
          variant="ghost"
        >
          <Forward className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
