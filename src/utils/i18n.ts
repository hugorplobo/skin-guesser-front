import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          next: "Next:",
          remainingGuesses: "guesses remaining",
          confirm: "Guess",
          stats: "Statistics",
          games: "games",
          victories: "of wins",
          currentStreak: "current streak",
          maxStreak: "longest streak",
          distribution: "Games distribution",
          try: "try",
          tries: "tries",
          hasWin: "Congratulations! You guessed in TRIES_N",
          hasLose: "You have lost, the skin was:",
          ready: "Ready!",
          error: "Something went wrong :(",
          share: "Share",
          copied: "Copied",
          show: "Show",
          hide: "Hide",
          title: "Skin guesser | Daily guess a League of Legends skin",
          description: "Daily try to guess the selected League of Legends skin in 5 attempts!"
        }
      },
      pt: {
        translation: {
          next: "Próximo:",
          remainingGuesses: "chutes restantes",
          confirm: "Confirmar",
          stats: "Estatísticas",
          games: "jogos",
          victories: "de vitórias",
          currentStreak: "sequência atual",
          maxStreak: "maior sequência",
          distribution: "Distribuição de jogos",
          try: "tentativa",
          tries: "tentativas",
          hasWin: "Parabéns! Você acertou em TRIES_N",
          hasLose: "Você perdeu, a skin era:",
          ready: "Já disponível!",
          error: "Alguma coisa deu errado :(",
          share: "Compartilhar",
          copied: "Copiado",
          show: "Mostrar",
          hide: "Ocultar",
          title: "Skin guesser | Adivinhe diariamente uma skin de League of Legends",
          description: "Diariamente tente adivinhar a skin selecionada do League of Legends em 5 tentativas!"
        }
      }
    }
  });

export default i18next;