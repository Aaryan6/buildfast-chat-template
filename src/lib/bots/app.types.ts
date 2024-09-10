export type AppsTypes = {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  category: string;
  image?: string;
  url: string;
  startingmessage?: string;
  suggestions?: string[];
  is_published?: boolean;
};
