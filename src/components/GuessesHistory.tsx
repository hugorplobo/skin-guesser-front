import { useGuesses } from "../hooks/useGuesses";

export default function GuessesHistory() {
  const history = useGuesses(state => state.history);

  return (
    <div className="flex flex-col w-full max-w-lg items-center gap-2 mb-10">
      { history.map(skin => 
        <div 
          className="flex justify-center items-center h-10 text-red-500 border w-full max-w-lg rounded"
        >
          {skin}
        </div>
        ) }
    </div>
  );
}
