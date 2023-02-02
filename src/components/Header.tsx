import { useState } from "react";
import Countdown from "react-countdown";
import getNextGameDate from "../utils/getNextGameDate";
import { BsBarChart } from "react-icons/bs";
import Stats from "./Stats";
import { createPortal } from "react-dom";

export default function Header() {
  const [hasTimerFinished, setHasTimerFinished] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  return (
    <div className="flex w-full max-w-lg justify-center items-center relative">
      <div className="absolute left-0 flex flex-col">
        <span className="font-bold text-xs left-0">Próximo:</span>
        {hasTimerFinished ? (
          <span className="text-xs">Já disponível!</span>
        ) : (
          <Countdown
            className="text-xs"
            date={getNextGameDate()}
            onComplete={() => setHasTimerFinished(true)}
            daysInHours
            autoStart
          />
        )}
      </div>
      <h1 className="font-bold text-2xl">Skin Guesser</h1>
      <BsBarChart
        className="absolute right-0 text-2xl cursor-pointer"
        onClick={() => setIsStatsOpen(true)}
      />
      { isStatsOpen ? (
        createPortal(<Stats onClose={() => setIsStatsOpen(false)} />, document.body)
      ) : null }
    </div>
  );
}
