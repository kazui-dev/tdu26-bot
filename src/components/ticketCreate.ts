import { ComponentContext, Components, Button } from 'discord-hono';
import { Bindings } from '../types';
import { TICKET_CONFIG } from '../constants';

export const ticketCreateHandler = async (c: ComponentContext<{ Bindings: Bindings }>) => {
  const userId = c.interaction.member?.user?.id;
  const username = c.interaction.member?.user?.username;
  const guildId = c.interaction.guild_id;

  if (!userId || !username || !guildId) {
    return c.res({ content: 'ユーザー情報の取得に失敗しました。', flags: 64 });
  }

  const existing = await c.env.DB.prepare(
    "SELECT channel_id FROM tickets WHERE user_id = ? AND status = 'open'"
  ).bind(userId).first();

  if (existing) {
    return c.res({
      content: '❌ 既にチケットを開いています:\n<#' + existing.channel_id + '>',
      flags: 64
    });
  }

  try {
    // チャンネル作成
    const channelName = TICKET_CONFIG.CHANNEL_PREFIX + username;

    const createRes = await c.rest(
      'POST',
      '/guilds/{guild.id}/channels',
      [guildId],
      {
        name: channelName,
        type: 0,
        parent_id: TICKET_CONFIG.CATEGORY_ID,
        permission_overwrites: [
          {
            id: guildId, // @everyone
            type: 0,
            deny: '1024', // View Channel x
          },
          {
            id: userId, // 作成者
            type: 1,
            allow: '3072', // View + Send
          },
          {
            id: TICKET_CONFIG.ADMIN_ROLE_ID, // 管理人
            type: 0,
            allow: '3072',
          },
          {
            id: c.env.DISCORD_APPLICATION_ID, // Bot
            type: 1,
            allow: '3072',
          }
        ]
      }
    );

    if (!createRes.ok) {
      const err = await createRes.text();
      console.error('チャンネル作成エラー:', err);
      throw new Error('チャンネル作成に失敗しました。');
    }

    const channel = await createRes.json() as { id: string };

    // DB登録
    await c.env.DB.prepare(
      "INSERT INTO tickets (channel_id, user_id, status) VALUES (?, ?, 'open')"
    ).bind(channel.id, userId).run();

    // ウェルカムメッセージ送信
    await c.rest(
      'POST',
      '/channels/{channel.id}/messages',
      [channel.id],
      {
        content: '<@' + userId + '> <@&' + TICKET_CONFIG.ADMIN_ROLE_ID + '>',

        embeds: [{
          title: 'お問い合わせありがとうございます',
          description: '<@&' + TICKET_CONFIG.ADMIN_ROLE_ID + '>が確認しますので、詳細をここに記入してお待ちください。\n解決したら「解決・終了」ボタンを押してください。',
          color: 0x0099ff,
        }],
        components: new Components().row(
          new Button('close_ticket', '解決・終了', 'Danger')
            .emoji('🔒')
        )
      }
    );

    return c.res({
      content: '✅ チケットを作成しました:\n<#' + channel.id + '>',
      flags: 64
    });

  } catch (e) {
    console.error(e);
    return c.res({
      content: '⚠️ エラーが発生しました。',
      flags: 64
    });
  }
};