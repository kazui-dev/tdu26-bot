import { CommandContext, Components, Button } from 'discord-hono';

export const setupTicket = (c: CommandContext) => {
  return c.res({
    embeds: [{
      title: 'お問い合わせ',
      description: 'サーバーに関する相談や報告がある場合は、下のボタンを押してください。\nお問い合わせ用のチケットチャンネルが作成されます。',
      color: 0x0099ff,
    }],
    components: new Components().row(
      new Button('create_ticket', 'チケットを作成する', 'Primary')
        .emoji('📩')
    ),
  });
};