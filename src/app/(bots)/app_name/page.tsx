import Chat from "@/components/chat/chat";
import { nanoid } from "@/lib/utils";

export default async function AppPage() {
  const id = nanoid();
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
  return (
    <div className="flex-1 flex flex-col">
      <Chat id={id} initialMessages={[]} appInfo={appInfo} />
    </div>
  );
}
