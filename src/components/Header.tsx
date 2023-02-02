import { useState } from "react";
import Countdown from "react-countdown";
import getNextGameDate from "../utils/getNextGameDate";

export default function Header() {
    const [hasTimerFinished, setHasTimerFinished] = useState(false);

    return (
        <div className="flex w-full max-w-lg justify-center relative">
          <div className="absolute left-0 flex flex-col">
            <span className="font-bold text-xs left-0">Próximo:</span>
            { hasTimerFinished ? (
              <span className="text-xs">Já disponível!</span>
            ) : (
              <Countdown 
                className="text-xs" 
                date={getNextGameDate()} 
                onComplete={() => setHasTimerFinished(true)}
                daysInHours
                autoStart
              />
            ) }
          </div>
          <h1 className="font-bold text-2xl">Skin Guesser</h1>
        </div>
    );
}