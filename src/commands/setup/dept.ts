import { CommandContext } from 'discord-hono';
import { getDeptComponents } from '../../components/deptComponents';

export const setupDept = (c: CommandContext) => {
  const components = getDeptComponents();

  return c.res({
    content: '所属する学科・学系を選択するとロールが付与されます。\n変更が必要な場合は、 https://discord.com/channels/1451183228613296232/1453187384563728475 をご利用ください。',
    components: components,
  });
};