import { nanoid } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function ChatPage({
  params: { app_name },
}: {
  params: { app_name: string };
}) {
  redirect(`/${app_name}/chat/${nanoid()}`);
}
