import { CommandContext, Components, Button } from 'discord-hono';

export const setupOmikuji = (c: CommandContext) => {
  return c.res({
    embeds: [{
      title: '⛩おみくじ',
      description: '今日の運勢を占ってみましょう。\n下のボタンを押すと結果が表示されます。',
      color: 0xff0000,
    }],
    components: new Components().row(
      new Button('draw_omikuji', 'おみくじを引く', 'Secondary')
        .emoji('🧧')
    ),
  });
};