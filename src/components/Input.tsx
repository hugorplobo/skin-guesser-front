import { useState } from "react";
import skins from "../../skins.json";
import { useGuesses } from "../hooks/useGuesses";
import { MD5 } from "crypto-js";
import { blue } from "tailwindcss/colors";
import Select, { components, createFilter, OptionProps, ActionMeta } from "react-select";
import { useTranslation } from "react-i18next";

export default function Input() {
  const { t } = useTranslation();
  const pushHistory = useGuesses(state => state.pushHistory);
  const win = useGuesses(state => state.win);
  const decrease = useGuesses(state => state.decreaseGuesses);
  const skinName = useGuesses(state => state.response);
  
  const [guessValue, setGuessValue] = useState("");

  function handleOnChange(value: unknown, action: ActionMeta<unknown>) {
    if ((action as { action: string }).action === "select-option") {
      setGuessValue((value as { value: string }).value);
    }
  }

  function handleOnClick() {
    if (guessValue !== "") {
      pushHistory(guessValue);

      if (MD5(guessValue).toString() === skinName) {
        win();
      } else {
        decrease();
      }
    }
  }

  const customOption = (props: OptionProps) => {
    props.innerProps.onMouseMove = undefined;
    props.innerProps.onMouseOver = undefined;

    return (
      <div>
        <components.Option {...props} />
      </div>
    );
  }

  return (
    <>
      <Select
        components={{ Option: customOption }} 
        options={skins.map((skin) => ({ value: skin, label: skin }))}
        className="w-full max-w-lg h-[40px] mt-4 text-black cursor-pointer"
        filterOption={createFilter({ ignoreAccents: false })}
        styles={{
          option: baseStyle => ({
            ...baseStyle,
            background: "white",
            cursor: "pointer",
            color: "black",
            transition: "background .1s ease-in-out",
            ":hover": {
              background: blue[200]
            }
          })
        }}
        onChange={handleOnChange}
        isClearable
        isSearchable
      />
      <button 
        className="bg-blue-500 h-[40px] shrink-0 m-4 w-full max-w-lg rounded hover:bg-blue-700 transition-colors"
        onClick={handleOnClick}
      >
        {t("confirm")}
      </button>
    </>
  );
}
