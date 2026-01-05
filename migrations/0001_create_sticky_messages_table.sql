-- migrations/0001_create_sticky_messages_table.sql

CREATE TABLE IF NOT EXISTS sticky_messages (
    channel_id TEXT PRIMARY KEY,
    current_message_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  channel_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  status TEXT NOT NULL DEFAULT 'open'
);

CREATE INDEX IF NOT EXISTS idx_tickets_user_status ON tickets(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tickets_channel_id ON tickets(channel_id);