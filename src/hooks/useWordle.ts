import { useState } from "react";
import { wordle_end_point } from "../App";
import { KeyColor } from "../components/Shared";
import { Letter } from "../components/Shared";

export interface HandleKeyup {
  ({ key }: { key: string }): void;
}

interface UseWordleState {
  turn: number;
  currentGuess: string;
  guesses: Letter[][];
  history: string[];
  isCorrect: boolean;
  newKeys: Set<string>;
  usedKeys: Map<string, KeyColor>;
  solution: string | null;
  handleKeyup: HandleKeyup;
}

const useWordle = (user_id: string): UseWordleState => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Letter[][]>(Array.from(new Array(6)));
  const [history, setHistory] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [newKeys, setNewKeys] = useState<Set<string>>(new Set<string>());
  const [usedKeys, setUsedKeys] = useState<Map<string, KeyColor>>(
    new Map<string, KeyColor>()
  );
  const [input_enabled, setInputEnabled] = useState<boolean>(true);
  const [solution, setSolution] = useState<string | null>(null);

  const formatGuess = (letter_colors: string): Letter[] => {
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: KeyColor.grey };
    });

    [...letter_colors].forEach((color, i) => {
      if (color === "g") {
        formattedGuess[i].color = KeyColor.green;
      } else if (color === "y") {
        formattedGuess[i].color = KeyColor.yellow;
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

    setNewKeys((newData) => {
      newData = new Set<string>();
      formattedGuess.forEach((letter) => {
        newData.add(letter.key);
      });
      return newData;
    });

    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((letter) => {
        prevUsedKeys.set(letter.key, letter.color);
      });
      return prevUsedKeys;
    });

    setCurrentGuess("");
  };

  const handleKeyup = ({ key }: { key: string }): void => {
    if (key === "Enter") {
      if (currentGuess.length !== 5) {
        window.alert("You need to enter 5 characters before submitting a word");
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
    newKeys,
    usedKeys,
    solution,
    handleKeyup,
  };
};

export default useWordle;
