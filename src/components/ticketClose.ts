import { ComponentContext } from 'discord-hono';
import { Bindings, Ticket } from '../types';
import { TICKET_CONFIG } from '../constants';

export const ticketCloseHandler = async (c: ComponentContext<{ Bindings: Bindings }>) => {
  const channelId = c.interaction.channel_id;
  const guildId = c.interaction.guild_id;

  if (!channelId || !guildId) {
    return c.res({ content: 'チャンネル情報の取得に失敗しました。', flags: 64 });
  }

  const ticket = await c.env.DB.prepare(
    "SELECT * FROM tickets WHERE channel_id = ?"
  ).bind(channelId).first<Ticket>();

  if (!ticket) {
    return c.res({ content: '❌ このチャンネルはデータベースに登録されていません。', flags: 64 });
  }

  if (ticket.status === 'closed') {
    return c.res({ content: '⚠️ このチケットは既にクローズされています。', flags: 64 });
  }

  try {
    await c.rest(
      'PATCH',
      '/channels/{channel.id}',
      [channelId],
      {
        parent_id: TICKET_CONFIG.CLOSED_CATEGORY_ID,

        permission_overwrites: [
          {
            id: guildId, // @everyone
            type: 0,
            deny: '1024', // View Channel x
          },
          {
            id: ticket.user_id, // チケット作成者
            type: 1,
            deny: '1024', // View Channel x
          },
          {
            id: TICKET_CONFIG.ADMIN_ROLE_ID, // 管理人
            type: 0,
            allow: '3072', // View + Send
          },
          {
            id: c.env.DISCORD_APPLICATION_ID, // Bot
            type: 1,
            allow: '3072',
          }
        ]
      }
    );

    await c.env.DB.prepare(
      "UPDATE tickets SET status = 'closed' WHERE channel_id = ?"
    ).bind(channelId).run();

    return c.res({
      content: '🔒 チケットをクローズし、アーカイブしました。\n作成者はこのチャンネルを閲覧できなくなりました。'
    });

  } catch (e) {
    console.error('Close Error:', e);
    return c.res({
      content: '⚠️ クローズ処理中にエラーが発生しました。',
      flags: 64
    });
  }
};