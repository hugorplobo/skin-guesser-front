import useCurrentDateString from "../hooks/useCurrentDateString";
import { useGuesses } from "../hooks/useGuesses";
import useSaveGame from "../hooks/useSaveGame";
import getSkinName from "../utils/getSkinName";
import Share from "./Share";

export default function GameEnded() {
  const date = useCurrentDateString();

  const hasWon = useGuesses((state) => state.hasWon);
  const hasLost = useGuesses((state) => state.hasLost);
  const skinName = useGuesses((state) => state.response);
  const remaining = useGuesses((state) => state.remaining);

  useSaveGame();

  return hasLost ? (
    <>
      <p>Você perdeu, a skin era:</p>
      <p className="text-2xl font-bold text-red-500">{getSkinName(skinName)}</p>
      <Share />
    </>
  ) : hasWon ? (
    <>
      <p>
        Parabéns! Você acertou em {5 - remaining + 1} tentativa
        {5 - remaining + 1 === 1 ? "" : "s"}
      </p>
      <p className="text-2xl font-bold text-green-500">
        {getSkinName(skinName)}
      </p>
      <Share />
    </>
  ) : null;
}
