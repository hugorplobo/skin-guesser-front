import { Stats } from "../hooks/useStats"

interface Props {
  stats: Stats
}

interface BarProps {
  stats: Stats,
  content: string,
  index: number,
  clasName?: string
}

function Bar({ stats, content, index, clasName }: BarProps) {
  return (
    <div className="flex w-full gap-2">
      <div className="w-4 text-center font-bold">{ content }</div>
      <div className={`font-bold px-2 flex justify-center ${clasName}`} style={{ width: `${(stats.distribution[index] / stats.gamesPlayed) * 100}%`, minWidth: "1.5rem" }}>
        { stats.distribution[index] }
      </div>
    </div>
  )
}

export default function Distribution({ stats }: Props) {
  return (
    <div className="w-full mt-4 flex items-center flex-col">
      <h2 className="font-bold text-xl">Distribuição de jogos</h2>
      <div className="w-full flex flex-col px-2 gap-2 mt-4">
        <Bar stats={stats} content={"1"} index={0} clasName="bg-green-500" />
        <Bar stats={stats} content={"2"} index={1} clasName="bg-green-500" />
        <Bar stats={stats} content={"3"} index={2} clasName="bg-green-500" />
        <Bar stats={stats} content={"4"} index={3} clasName="bg-green-500" />
        <Bar stats={stats} content={"5"} index={4} clasName="bg-green-500" />
        <Bar stats={stats} content={"X"} index={5} clasName="bg-red-500" />
      </div>
    </div>
  )
}