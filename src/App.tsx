import CanvasImage from "./components/CanvasImage";
import useCurrentDateString from "./hooks/useCurrentDateString";
import GuessesRemaining from "./components/GuessesRemaining";
import Input from "./components/Input";
import { useGuesses } from "./hooks/useGuesses";
import useSWRImmutable from "swr/immutable";
import GuessesHistory from "./components/GuessesHistory";
import { config } from "./config";
import GameEnded from "./components/GameEnded";
import { useEffect } from "react";
import Header from "./components/Header";
import useLoadGame from "./hooks/useLoadGame";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function App() {
  const { t, i18n } = useTranslation();
  const date = useCurrentDateString();

  const hasWon = useGuesses(state => state.hasWon);
  const hasLost = useGuesses(state => state.hasLost);
  const skinName = useGuesses(state => state.response);
  const setSkin = useGuesses(state => state.setResponse);
  const setGameDate = useGuesses(state => state.setGameDate);

  const language = window.location.pathname.split("/")[1];
  const url = `${config.apiUrl}/game?date=${date}`;
  const { data } = useSWRImmutable<{ skin_name: string }>(url, async () => {
    return fetch(url)
      .then(res => res.json());
  });

  document.documentElement.lang = language;

  if (data && skinName !== data.skin_name) {
    setSkin(data.skin_name);
  }

  useEffect(() => {
    setGameDate(date);
  }, []);

  useLoadGame();
  
  if (i18n.language !== language) {
    i18n.changeLanguage(language);
  }

  return (
    <div className="flex w-full min-h-screen p-4 text-white items-center flex-col justify-between relative">
      <Helmet>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")!}></meta>
      </Helmet>
      <div className="flex w-full items-center flex-col">
        <Header />
        <CanvasImage 
          url={url}
        />
        { hasLost || hasWon ? (
          <GameEnded />
        ) : (
          <>
            <GuessesRemaining />
            <Input />
            <GuessesHistory />
          </>
        ) }
      </div>
      <footer className="text-xs text-center max-w-lg text-neutral-500">
        Skin Guesser is not endorsed by Riot Games and does not reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc
      </footer>
    </div>
  );
}
