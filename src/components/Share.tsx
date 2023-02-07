import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGuesses } from "../hooks/useGuesses";

export default function Share() {
  const { t } = useTranslation();
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasWon = useGuesses(state => state.hasWon);
  const history = useGuesses(state => state.history.slice(hasWon ? 1 : 0));
  const date = useGuesses(state => state.gameDate);

  const emojis = [...history.map((_) => "🟥"), hasWon ? "🟩" : null].join("").padEnd(10, "⬜️");

  function copyGame() {
    if (!copied) {
      navigator.clipboard.writeText(`Joguei o skin guesser ${date.split("-").reverse().join("/")}\n\n${emojis}\n\nTente também em https://skin-guesser.netlify.app`);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className="rounded my-4 py-3 w-80 flex flex-col items-center gap-4">
      {emojis}
      <button onClick={copyGame} className="font-bold py-1 px-2 hover:bg-blue-600 hover:text-white hover:outline-blue-600 rounded text-blue-600 bg-transparent outline outline-1 outline-blue-600 transition-colors">
        { copied ? t("copied") : t("share") }
      </button>
      <span className="text-xs cursor-pointer underline" onClick={() => setShowHistory(history => !history)}>
        {(showHistory ? t("hide") : t("show")) + " " + t("tries")}
      </span>
      { showHistory && history.length > 0 ? (
        <div className="flex flex-col items-center">
          { history.map(guess => <span>❌ { guess }</span>) }
        </div>
      ) : null }
    </div>
  );
}
