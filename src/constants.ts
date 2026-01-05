export const SERVER_RULES_TEXT = `
TDU26生Discordに参加いただき、ありがとうございます！
快適なサーバー運営のため、以下のルールを遵守してください。

## 認証・ロール付与
- まずは、このメッセージの下にある認証ボタンを押してルールに同意してください。
- 認証後、ロール付与チャンネルが表示されます。
- 所属する学科・学系を選択すると、他のチャンネルにアクセスできるようになります。
※ 入室後1週間以内に反応がない場合、管理人からお声掛けさせていただきます。

## 禁止事項・マナー
各チャンネルについて、目的外の利用が目立つ場合は管理人からお声掛けさせていただきます。
​また、全員が気持ちよく過ごせるよう、以下の行為は禁止です。
- 他のメンバーに対する誹謗中傷やプライバシーの侵害
- スパム行為や過度な宣伝
- 不適切なコンテンツの投稿（暴力的、性的、差別的な内容など）
- Discordの利用規約に違反する行為
- その他、公序良俗に反する行為

## 困ったときは
- サーバーに関する要望は https://discord.com/channels/1451183228613296232/1451192730888704103 までお願いします。
- 管理人への相談や報告、質問は https://discord.com/channels/1451183228613296232/1453187384563728475 からご連絡ください。
- 要望・お問い合わせの内容によっては、対応に時間がかかる場合があります。ご了承ください。

## 免責事項
- サーバー内でのトラブルや損害について、管理人は一切の責任を負いません。
- ルールは予告なく変更されることがあります。定期的に確認してください。

下のボタンからルールに同意して、サーバーの利用を開始してください。
みなさんが快適に過ごせるよう、ご協力をお願いいたします！
`;

export const VERIFIED_ROLE_ID = '1452580987635630155';

export const YEAR_26_ROLE = {
  id: '1451248574229774336',
  name: '26生',
} as const;

export interface Department {
  label: string;
  value: string;
  roleId: string;
}

export interface Faculty {
  id: string;
  name: string;
  roleId: string;
  departments: Department[];
}

export const FACULTIES: Faculty[] = [
  {
    id: 'fac_E',
    name: '工学部（E）',
    roleId: '1451189772428120106',
    departments: [
      { label: 'EJ: 電気電子工学科', value: 'dept_EJ', roleId: '1451190341104570399' },
      { label: 'EH: 電子システム工学科', value: 'dept_EH', roleId: '1451190393461801011' },
      { label: 'ES: 応用化学科', value: 'dept_ES', roleId: '1451190432011784213' },
      { label: 'EK: 機械工学科', value: 'dept_EK', roleId: '1451190468825055303' },
      { label: 'EF: 先端機械工学科', value: 'dept_EF', roleId: '1451190515356668028' },
      { label: 'EC: 情報通信工学科', value: 'dept_EC', roleId: '1451190554124750952' },
    ],
  },
  {
    id: 'fac_N',
    name: '工学部第二部（N）',
    roleId: '1451189948404334674',
    departments: [
      { label: 'NE: 電気電子工学科', value: 'dept_NE', roleId: '1451191279705653412' },
      { label: 'NM: 機械工学科', value: 'dept_NM', roleId: '1451191476951322684' },
      { label: 'NC: 情報通信工学科', value: 'dept_NC', roleId: '1451191522388082718' },
    ],
  },
  {
    id: 'fac_F',
    name: '未来科学部（F）',
    roleId: '1451190004641693727',
    departments: [
      { label: 'FA: 建築学科', value: 'dept_FA', roleId: '1451191600372776981' },
      { label: 'FI: 情報メディア学科', value: 'dept_FI', roleId: '1451191633960767641' },
      { label: 'FR: ロボット・メカトロニクス学科', value: 'dept_FR', roleId: '1451191674847101029' },
    ],
  },
  {
    id: 'fac_A',
    name: 'システムデザイン工学部（A）',
    roleId: '1451190056999063674',
    departments: [
      { label: 'AJ: 情報システム工学科', value: 'dept_AJ', roleId: '1451191744178815088' },
      { label: 'AD: デザイン工学科', value: 'dept_AD', roleId: '1451191800155869296' },
    ],
  },
  {
    id: 'fac_R',
    name: '理工学部（R）',
    roleId: '1451190115836760277',
    departments: [
      { label: 'RU: 理学系', value: 'dept_RU', roleId: '1451545972927631367' },
      { label: 'RB: 生命科学系', value: 'dept_RB', roleId: '1451191835065319507' },
      { label: 'RD: 情報システムデザイン学系', value: 'dept_RD', roleId: '1451191898604830782' },
      { label: 'RM: 機械工学系', value: 'dept_RM', roleId: '1451191943676821544' },
      { label: 'RE: 電子情報・生体医工学系', value: 'dept_RE', roleId: '1451191970834812991' },
      { label: 'RG: 建築・都市環境学系', value: 'dept_RG', roleId: '1451192022399582299' },
    ],
  },
];

export const TICKET_CONFIG = {
  CATEGORY_ID: '1453180462033010869',
  CLOSED_CATEGORY_ID: '1453191598891597956',
  ADMIN_ROLE_ID: '1451211183850913935',
  CHANNEL_PREFIX: 'ticket-',
};