import { useState } from "react";
import { Letter } from "../components/Row";
import { wordle_end_point } from "../App";

interface UseWordleProps {
  user_id: string | null;
}

export interface HandleKeyup {
  ({ key }: { key: string }): void;
}

interface UseWordleState {
  turn: number;
  currentGuess: string;
  guesses: Letter[][];
  history: string[];
  isCorrect: boolean;
  usedKeys: { [key: string]: "grey" | "green" | "yellow" };
  solution: string | null;
  handleKeyup: HandleKeyup;
}

const useWordle = ({ user_id }: UseWordleProps): UseWordleState => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Letter[][]>(Array.from(new Array(6)));
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState<{
    [key: string]: "grey" | "green" | "yellow";
  }>({});
  const [input_enabled, setInputEnabled] = useState<boolean>(true);
  const [solution, setSolution] = useState<string | null>(null);

  const formatGuess = (letter_colors: string): Letter[] => {
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    [...letter_colors].forEach((color, i) => {
      if (color === "g") {
        formattedGuess[i].color = "green";
      } else if (color === "y") {
        formattedGuess[i].color = "yellow";
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: Letter[], match: boolean): void => {
    if (match) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => [...prevHistory, currentGuess]);

    setTurn((prevTurn) => prevTurn + 1);

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((letter) => {
        const currentColor = prevUsedKeys[letter.key];

        if (letter.color === "green") {
          prevUsedKeys[letter.key] = "green";
          return;
        }

        if (letter.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[letter.key] = "yellow";
          return;
        }

        if (letter.color === "grey" && currentColor !== ("green" || "yellow")) {
          prevUsedKeys[letter.key] = "grey";
          return;
        }
      });

      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }: { key: string }): void => {
    if (key === "Enter") {
      if (currentGuess.length !== 5) {
        console.log("word must be 5 chars.");
        return;
      }

      setInputEnabled(false);
      const wordle_arguments = "?userid=" + user_id + "&word=" + currentGuess;
      const final_url = wordle_end_point + wordle_arguments;
      console.log(final_url);
      void fetch(final_url, {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
        .then((response: Response) => {
          if (!response.ok) {
            throw Error();
          }
          return response.json();
        })
        .then((res) => {
          const status: string = res.status;
          if (["match", "miss_match", "miss_all"].indexOf(status) !== -1) {
            const isMatch = status === "match";
            const word: string | null = res.word;
            const letter_colors: string = res.letter_colors;
            if (isMatch) setSolution(word);
            if (status === "miss_all") {
              setSolution(word);
            }
            const formatted = formatGuess(letter_colors);
            addNewGuess(formatted, isMatch);
          } else if (status === "used") {
            window.alert("Word already entered");
          } else if (status === "invalid_word") {
            window.alert("You entered an invalid word");
          } else if (status === "invalid_user_id") {
            console.log("received invalid user id");
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        })
        .finally(() => {
          setInputEnabled(true);
        });
    }

    if (input_enabled && key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (input_enabled && /^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    history,
    isCorrect,
    usedKeys,
    solution,
    handleKeyup,
  };
};

export default useWordle;
