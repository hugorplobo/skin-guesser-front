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
import Stats from "./components/Stats";

export default function App() {
  const date = useCurrentDateString();

  const hasWon = useGuesses(state => state.hasWon);
  const hasLost = useGuesses(state => state.hasLost);
  const skinName = useGuesses(state => state.response);
  const setSkin = useGuesses(state => state.setResponse);
  const setGameDate = useGuesses(state => state.setGameDate);

  const url = `${config.apiUrl}/game?date=${date}`;
  const { data } = useSWRImmutable<{ skin_name: string }>(url, async () => {
    return fetch(url)
      .then(res => res.json());
  });

  if (data && skinName !== data.skin_name) {
    setSkin(data.skin_name);
  }

  useEffect(() => {
    setGameDate(date);
  }, []);

  useLoadGame();

  return (
    <div className="flex w-full min-h-screen p-4 text-white items-center flex-col justify-between relative">
      <div className="flex w-full items-center flex-col">
        <Header />
        <CanvasImage 
          url={url}
          className="w-full max-w-lg m-4 shadow-lg" 
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
