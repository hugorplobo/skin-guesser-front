import { GameData } from "./useLoadGame";

export interface Stats {
  gamesPlayed: number,
  winPercentage: number,
  currentStreak: number,
  maxStreak: number,
  distribution: number[]
}

interface Games {
  [key: string]: string;
}

export default function useStats() {
  const games: Games = JSON.parse(JSON.stringify(localStorage));
  const sortedKeys = Object.keys(games).sort();

  let gamesWon = 0;
  const stats: Stats = {
    gamesPlayed: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: []
  };

  for (const date of sortedKeys) {
    const game: GameData = JSON.parse(games[date]);
    stats.gamesPlayed++;

    if (game.hasWon) {
      gamesWon++;
    }
  }

  stats.currentStreak = getCurrentStreak(sortedKeys, games);
  stats.maxStreak = getMaxStreak(sortedKeys, games);
  stats.distribution = getDistribution(sortedKeys, games);

  stats.winPercentage = stats.gamesPlayed === 0 ? 0 : gamesWon / stats.gamesPlayed;
  return stats;
}

function getCurrentStreak(keys: string[], games: Games) {
  let currentStreak = 0;
  const reversedKeys = [...keys].reverse();

  for (const date of reversedKeys) {
    const game: GameData = JSON.parse(games[date]);

    if (game.hasWon === undefined) {
      continue;
    }

    if (game.hasWon) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}

function getMaxStreak(keys: string[], games: Games) {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const date of keys) {
    const game: GameData = JSON.parse(games[date]);
    if (game.hasWon) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  }

  return maxStreak;
}

function getDistribution(keys: string[], games: Games) {
  const distribution = [0, 0, 0, 0, 0, 0];

  for (const date of keys) {
    const game: GameData = JSON.parse(games[date]);
    if (game.hasWon) {
      const guesses = 5 - game.remaining + 1;
      distribution[guesses - 1]++;
    } else {
      distribution[5]++;
    }
  }

  return distribution;
}