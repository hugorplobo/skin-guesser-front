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

  let gamesWon = 0;
  const stats: Stats = {
    gamesPlayed: 0,
    winPercentage: 0,
    currentStreak: 0,
    maxStreak: 0,
    distribution: []
  };

  for (const date in games) {
    const game: GameData = JSON.parse(games[date]);
    stats.gamesPlayed++;

    if (game.hasWon) {
      gamesWon++;
    }
  }

  stats.currentStreak = getCurrentStreak(games);
  stats.maxStreak = getMaxStreak(games);
  stats.distribution = getDistribution(games);

  stats.winPercentage = stats.gamesPlayed === 0 ? 0 : gamesWon / stats.gamesPlayed;
  return stats;
}

function getCurrentStreak(games: Games) {
  let currentStreak = 0;

  for (const date of Object.keys(games).reverse()) {
    const game: GameData = JSON.parse(games[date]);
    if (game.hasWon) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
}

function getMaxStreak(games: Games) {
  let maxStreak = 0;
  let currentStreak = 0;

  for (const date in games) {
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

function getDistribution(games: Games) {
  const distribution = [0, 0, 0, 0, 0, 0];

  for (const date in games) {
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