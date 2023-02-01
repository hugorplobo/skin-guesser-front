import { create } from "zustand";

export interface GuessesState {
  remaining: number;
  history: string[];
  hasWon: boolean;
  hasLost: boolean;
  response: string;
  gameDate: string;
  pushHistory: (value: string) => void;
  decreaseGuesses: () => void;
  win: () => void;
  lose: () => void;
  setResponse: (value: string) => void;
  setGameDate: (value: string) => void;
}

export const useGuesses = create<GuessesState>((set) => ({
  remaining: 5,
  history: [],
  hasWon: false,
  hasLost: false,
  response: "",
  gameDate: "",
  pushHistory: (value) =>
    set((state) => ({ history: [value, ...state.history] })),
  decreaseGuesses: () =>
    set((state) => {
      if (state.remaining <= 1) {
        state.lose();
      }

      return { remaining: state.remaining - 1 };
    }),
  win: () => set((_) => ({ hasWon: true })),
  lose: () => set((_) => ({ hasLost: true })),
  setResponse: (value) => set((_) => ({ response: value })),
  setGameDate: (value) => set((_) => ({ gameDate: value })),
}));
