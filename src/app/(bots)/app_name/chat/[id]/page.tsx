import { getChats } from "@/actions/chat.history";
import Chat from "@/components/chat/chat";

export const dynamic = "force-dynamic";

export default async function ChatbotPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const appInfo = {
    name: "App Name",
    slug: "app_name",
    category: "category",
    url: "/app_name",
    description: "Description",
    startingmessage: "Hello, how can I help you today?",
    suggestions: ["Suggestion 1", "Suggestion 2", "Suggestion 3"],
    image: "",
  };
  // const { data: chats } = await getChats({
  //   app_slug: appInfo?.slug as string,
  //   id,
  // });
  return (
    <div className="flex-1 flex flex-col">
      <Chat id={id} initialMessages={[]} appInfo={appInfo} />
    </div>
  );
}
