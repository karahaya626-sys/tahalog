export interface GameSocialMeta {
  hashtag: string;
  steam: boolean;
  indie: boolean;
}

const GAME_SOCIAL_META: Record<string, GameSocialMeta> = {
  'BALL x PIT': {
    hashtag: 'BALLxPIT',
    steam: true,
    indie: true,
  },
  'Demon Lord: Just a Block': {
    hashtag: 'カード魔王',
    steam: true,
    indie: true,
  },
  'カード魔王': {
    hashtag: 'カード魔王',
    steam: true,
    indie: true,
  },
  'Echoes of Mystralia': {
    hashtag: 'EchoesOfMystralia',
    steam: true,
    indie: true,
  },
  Emberward: {
    hashtag: 'Emberward',
    steam: true,
    indie: true,
  },
  Factomancer: {
    hashtag: 'Factomancer',
    steam: true,
    indie: true,
  },
  Guildrun: {
    hashtag: 'Guildrun',
    steam: true,
    indie: true,
  },
  'Guns & Dragons': {
    hashtag: 'GunsAndDragons',
    steam: true,
    indie: true,
  },
  KUBB: {
    hashtag: 'KUBB',
    steam: true,
    indie: true,
  },
  "Lazy Witch's Factory": {
    hashtag: 'LazyWitchsFactory',
    steam: true,
    indie: true,
  },
  Moonbrella: {
    hashtag: 'Moonbrella',
    steam: true,
    indie: true,
  },
  Moonlighter: {
    hashtag: 'Moonlighter',
    steam: true,
    indie: true,
  },
  '司令官、オークの大群です！': {
    hashtag: 'SirWeHaveAnOrcProblem',
    steam: true,
    indie: true,
  },
  Swarmdustry: {
    hashtag: 'Swarmdustry',
    steam: true,
    indie: true,
  },
  Vena: {
    hashtag: 'Vena',
    steam: true,
    indie: true,
  },
  Wanderburg: {
    hashtag: 'Wanderburg',
    steam: true,
    indie: true,
  },
};

export function getGameSocialHashtags(tags: string[]): string[] {
  for (const tag of tags) {
    const meta = GAME_SOCIAL_META[tag];
    if (!meta) continue;

    return [
      meta.hashtag,
      ...(meta.steam ? ['Steam'] : []),
      ...(meta.indie ? ['インディーゲーム'] : []),
    ];
  }

  return [];
}
