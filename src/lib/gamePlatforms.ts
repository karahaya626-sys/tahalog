export interface GamePlatformInfo {
  platforms: string;
  note?: string;
}

const GAME_PLATFORMS: Record<string, GamePlatformInfo> = {
  'BALL x PIT': {
    platforms: 'PC（Steam：Windows / macOS） / PS5 / Xbox Series X|S / Nintendo Switch / Nintendo Switch 2',
  },
  'Demon Lord: Just a Block': {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  'カード魔王': {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  'Echoes of Mystralia': {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Emberward: {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Factomancer: {
    platforms: 'PC（Steam：Windows / macOS）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Guildrun: {
    platforms: 'PC（Steam：Windows / macOS）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  'Guns & Dragons': {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  KUBB: {
    platforms: 'PC（Steam：Windows / macOS / Linux）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  "Lazy Witch's Factory": {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Moonbrella: {
    platforms: 'PC（Steam：Windows / macOS / Linux） / PS4 / PS5 / Xbox One / Xbox Series X|S',
    note: 'Nintendo Switch版は現時点で発表なし',
  },
  Moonlighter: {
    platforms: 'PC（Steam：Windows / macOS / Linux） / PS4 / Xbox One / Nintendo Switch',
  },
  '司令官、オークの大群です！': {
    platforms: 'PC（Steam：Windows / Linux）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Swarmdustry: {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Vena: {
    platforms: 'PC（Steam：Windows / macOS / Linux）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
  Wanderburg: {
    platforms: 'PC（Steam：Windows）',
    note: 'PS5・Xbox・Nintendo Switch版は現時点で発表なし',
  },
};

export function getGamePlatformInfo(tags: string[]): GamePlatformInfo | undefined {
  for (const tag of tags) {
    const platformInfo = GAME_PLATFORMS[tag];
    if (platformInfo) return platformInfo;
  }

  return undefined;
}
