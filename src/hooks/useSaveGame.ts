import useCurrentDateString from "./useCurrentDateString";
import { useGuesses } from "./useGuesses";
import { GameData } from "./useLoadGame";

export default function useSaveGame() {
  const date = useCurrentDateString();
  const hasWon = useGuesses((state) => state.hasWon);
  const remaining = useGuesses((state) => state.remaining);
  const history = useGuesses((state) => state.history);

  if (!localStorage.getItem(date)) {
    const gameData: GameData = {
      hasWon,
      remaining,
      history
    }

    localStorage.setItem(date, JSON.stringify(gameData));
  }
}
