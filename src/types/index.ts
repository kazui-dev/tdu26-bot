import { D1Database } from '@cloudflare/workers-types';

export type StickyMessage = {
  channel_id: string;
  current_message_id: string;
  title: string;
  content: string;
};

export type Ticket = {
  id: number;
  channel_id: string;
  user_id: string;
  created_at: number;
  status: string; // 'open' | 'closed'
};

export type Bindings = {
  DB: D1Database;
  DISCORD_APPLICATION_ID: string;
  DISCORD_PUBLIC_KEY: string;
  DISCORD_TOKEN: string;
};