import { useGuesses } from "../hooks/useGuesses";

export default function GuessesRemaining() {
  const remaining = useGuesses(state => state.remaining);

  return (
    <p className="text-sm">
      <span 
        className={`${remaining >= 3 ? "text-green-500" : "text-red-500"} font-bold`}
      >
        { remaining }
      </span> chute{ remaining > 1 ? "s" : "" } restante{ remaining > 1 ? "s" : "" }
    </p>
  );
}
