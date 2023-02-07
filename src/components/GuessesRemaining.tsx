import { useTranslation } from "react-i18next";
import { useGuesses } from "../hooks/useGuesses";

export default function GuessesRemaining() {
  const { t } = useTranslation();
  const remaining = useGuesses(state => state.remaining);

  return (
    <p className="text-sm">
      <span 
        className={`${remaining >= 3 ? "text-green-500" : "text-red-500"} font-bold`}
      >
        { remaining }
      </span> { remaining > 1 ? t("tries") : t("try") }
    </p>
  );
}
