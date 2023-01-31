import { useEffect, useState } from "react";
import WindowedSelect, { ActionMeta } from "react-windowed-select";
import skins from "../../skins.json";
import useCurrentDateString from "../hooks/useCurrentDateString";
import useSWRImmutable from "swr/immutable";
import { useGuesses } from "../hooks/useGuesses";
import { TailSpin } from "react-loader-spinner";
import { MD5 } from "crypto-js";

export default function Input() {
  const history = useGuesses(state => state.history);
  const pushHistory = useGuesses(state => state.pushHistory);
  const win = useGuesses(state => state.win);
  const decrease = useGuesses(state => state.decreaseGuesses);
  const skinName = useGuesses(state => state.response);
  
  const date = useCurrentDateString();
  const [guessValue, setGuessValue] = useState("");
  const [url, setUrl] = useState<string | null>(null);

  const { data, isLoading } = useSWRImmutable(url, async () => {
      return fetch(url!)
        .then(res => res.text())
        .then(res => res === "true");
    }
  );

  function handleOnChange(value: unknown, action: ActionMeta<unknown>) {
    if ((action as { action: string }).action === "select-option") {
      setGuessValue((value as { value: string }).value);
    }
  }

  function handleOnClick() {
    if (guessValue !== "") {
      setUrl(`http://localhost:9989/guess?date=${date}&guess=${guessValue}`);
    }
  }

  useEffect(() => {
    if (data !== undefined) {
      setUrl(null);
    
      pushHistory(guessValue);

      if (MD5(guessValue).toString() === skinName) {
        win();
      } else {
        decrease();
      }
    }
  }, [data]);

  return (
    <>
      <WindowedSelect
        options={skins.map((skin) => ({ value: skin, label: skin }))}
        className="w-full max-w-lg h-[40px] mt-4 text-black cursor-pointer"
        placeholder="Selecione a skin"
        windowThreshold={100}
        onChange={handleOnChange}
        isSearchable
      />
      <button 
        className="bg-blue-500 h-[40px] shrink-0 m-4 w-full max-w-lg rounded hover:bg-blue-700 transition-colors"
        onClick={handleOnClick}
      >
        { isLoading ? (
          <TailSpin height={20} color="white" wrapperStyle={{ justifyContent: "center" }} />
        ) : (
          "Confirmar"
        ) }
      </button>
    </>
  );
}
