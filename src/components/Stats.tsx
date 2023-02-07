import { ReactElement, useRef } from "react";
import { useTranslation } from "react-i18next";
import useStats from "../hooks/useStats";
import Distribution from "./Distribution";

interface ColumnTextProps {
  children: ReactElement[],
  className?: string
}

interface Props {
  onClose: () => void
}

function ColumnText({ children, className }: ColumnTextProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      { children }
    </div>
  )
}

export default function Stats({ onClose }: Props) {
  const { t } = useTranslation();
  const stats = useStats();
  const bg = useRef(null);

  function handleClose(event: React.MouseEvent) {
    if (event.target === bg.current) {
      onClose();
    }
  }

  return (
    <div ref={bg} onClick={e => handleClose(e)} className="w-screen h-full bg-black text-white bg-opacity-90 absolute z-10 top-0 flex justify-center items-start sm:justify-center sm:items-center">
      <div className="flex flex-col gap-4 items-center w-full max-w-sm p-4 bg-gray-800 rounded shadow-lg mt-16 sm:mt-0">
        <h2 className="font-bold text-xl">{t("stats")}</h2>
        <div className="w-full flex justify-evenly">
          <ColumnText>
            <span className="font-bold text-xl">{ stats.gamesPlayed }</span>
            <span className="text-sm">{t("games")}</span>
          </ColumnText>
          <ColumnText>
            <span className="font-bold text-xl">{ `${(stats.winPercentage * 100).toFixed(2)}%` }</span>
            <span className="text-sm">{t("victories")}</span>
          </ColumnText>
          <ColumnText className="w-16">
            <span className="font-bold text-xl">{ stats.currentStreak }</span>
            <span className="text-sm text-center">{t("currentStreak")}</span>
          </ColumnText>
          <ColumnText className="w-16">
            <span className="font-bold text-xl">{ stats.currentStreak }</span>
            <span className="text-sm text-center">{t("maxStreak")}</span>
          </ColumnText>
        </div>
        <Distribution stats={stats} />
      </div>
    </div>
  );
}
