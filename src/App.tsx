import CanvasImage from "./components/CanvasImage";
import useCurrentDateString from "./hooks/useCurrentDateString";
import GuessesRemaining from "./components/GuessesRemaining";
import Input from "./components/Input";
import { useGuesses } from "./hooks/useGuesses";
import useSWRImmutable from "swr/immutable";
import getSkinName from "./utils/getSkinName";
import GuessesHistory from "./components/GuessesHistory";

export default function App() {
  const date = useCurrentDateString();

  const hasWon = useGuesses(state => state.hasWon);
  const hasLost = useGuesses(state => state.hasLost);
  const remaining = useGuesses(state => state.remaining);
  const skinName = useGuesses(state => state.response);
  const setSkin = useGuesses(state => state.setResponse);

  const url = `http://localhost:9989/game?date=${date}`;
  const { data } = useSWRImmutable<{ skin_name: string }>(url, async () => {
    return fetch(url)
      .then(res => res.json());
  });

  if (data && skinName !== data.skin_name) {
    setSkin(data.skin_name);
  }

  return (
    <div className="flex h-screen text-white items-center p-4 flex-col justify-between">
      <div className="flex items-center flex-col">
        <h1 className="font-bold text-2xl">Skin Guesser</h1>
        <CanvasImage 
          url={url}
          className="w-full max-w-lg m-4 shadow-lg" 
        />
        { hasLost ? (
          <>
            <p>Você perdeu, a skin era:</p>
            <p className="text-2xl font-bold text-red-500">
              { getSkinName(skinName) }
            </p>
          </>
        ) : hasWon ? (
          <>
            <p>Parabéns! Você acertou em { 5 - remaining + 1 } tentativa{ 5 - remaining + 1 === 1 ? "" : "s" }</p>
            <p className="text-2xl font-bold text-green-500">
              { getSkinName(skinName) }
            </p>
          </>
        ) : (
          <>
            <GuessesRemaining />
            <Input />
            <GuessesHistory />
          </>
        ) }
      </div>
      <footer className="text-xs text-center max-w-lg text-neutral-500 relative bottom-4">
        Skin Guesser is not endorsed by Riot Games and does not reflect the
        views or opinions of Riot Games or anyone officially involved in
        producing or managing Riot Games properties. Riot Games and all
        associated properties are trademarks or registered trademarks of Riot
        Games, Inc
      </footer>
    </div>
  );
}
