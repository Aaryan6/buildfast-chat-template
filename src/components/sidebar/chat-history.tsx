"use client";

import { Message } from "ai";
import Link from "next/link";

export default function ChatHistory({
  chats,
  isFetching,
  appName,
}: {
  chats: any;
  isFetching: boolean;
  appName: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-medium">History</h1>
      </div>
      <div className="space-y-2 flex-1 flex flex-col overflow-y-auto">
        {chats?.map((chat: { messages: Message[]; id: string }) => (
          <Link
            href={`/${appName}/chat/${chat.id}`}
            key={chat.id}
            className="flex items-center space-x-2 bg-muted p-2 rounded-md hover:bg-muted/80 transition-all duration-200"
          >
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium line-clamp-1">
                {chat.messages[0]?.role === "user"
                  ? chat.messages[0]?.content
                  : chat.messages[1]?.content || "Untitled"}
              </p>
            </div>
          </Link>
        ))}
        {isFetching && <div>Loading...</div>}
        {chats?.length === 0 && !isFetching && (
          <p className="text-muted-foreground text-sm">No chats yet.</p>
        )}
      </div>
    </div>
  );
}
