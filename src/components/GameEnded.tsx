import { useGuesses } from "../hooks/useGuesses";
import useSaveGame from "../hooks/useSaveGame";
import getSkinName from "../utils/getSkinName";
import Share from "./Share";
import { useTranslation } from "react-i18next";

export default function GameEnded() {
  const { t } = useTranslation();

  const hasWon = useGuesses((state) => state.hasWon);
  const hasLost = useGuesses((state) => state.hasLost);
  const skinName = useGuesses((state) => state.response);
  const remaining = useGuesses((state) => state.remaining);

  useSaveGame();

  return hasLost ? (
    <>
      <p>{t("hasLose")}</p>
      <p className="text-2xl font-bold text-red-500">{getSkinName(skinName)}</p>
      <Share />
    </>
  ) : hasWon ? (
    <>
      <p>
        {t("hasWin").replace("TRIES_N", (5 - remaining + 1).toString() + " ")}
        {5 - remaining + 1 === 1 ? t("try") : t("tries")}
      </p>
      <p className="text-2xl font-bold text-green-500">
        {getSkinName(skinName)}
      </p>
      <Share />
    </>
  ) : null;
}
