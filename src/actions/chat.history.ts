"use server";

import { getUser } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";
import { Message } from "ai";

export type Chat = {
  id: string;
  user_id: string;
  app_slug: string;
  messages: Message[];
  path: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
};

export async function storeChat({
  id,
  app_slug,
  messages,
  path,
  user_id,
  metadata,
}: Chat) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("bots_history")
      .upsert({
        id,
        app_slug,
        messages,
        path,
        user_id,
        metadata,
      })
      .select("*")
      .single();

    if (error) {
      return { error };
    }

    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getChats({
  app_slug,
  id,
}: {
  app_slug: string;
  id: string;
}) {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    return { error: "User not found", data: [] };
  }

  const { data, error } = await supabase
    .from("bots_history")
    .select("*")
    .eq("app_slug", app_slug)
    .eq("user_id", user.id)
    .eq("id", id)
    .single();

  if (error) {
    return { error, data: [] };
  }

  return { data };
}

export async function getUserChats(appSlug: string) {
  const supabase = createClient();
  const user = await getUser(supabase);

  if (!user) {
    return { error: "User not found", data: [] };
  }

  const { data, error } = await supabase
    .from("bots_history")
    .select("*")
    .eq("user_id", user.id)
    .eq("app_slug", appSlug);

  if (error) {
    return { error, data: [] };
  }

  return { data: data ?? [] };
}
