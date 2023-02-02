import useCurrentDateString from "./useCurrentDateString";
import { useGuesses } from "./useGuesses";

export interface GameData {
  history: string[],
  hasWon: boolean,
  remaining: number
}

export default function useLoadGame() {
  const date = useCurrentDateString();
  const win = useGuesses(state => state.win);
  const lose = useGuesses(state => state.lose);
  const setHistory = useGuesses(state => state.setHistory);
  const setRemaining = useGuesses(state => state.setRemaining);

  const currentGame = localStorage.getItem(date);

  if (currentGame) {
    const currentGameData: GameData = JSON.parse(currentGame);
    
    setHistory(currentGameData.history);
    setRemaining(currentGameData.remaining);

    if (currentGameData.hasWon) {
      win();
    } else {
      lose();
    }
  }
}
