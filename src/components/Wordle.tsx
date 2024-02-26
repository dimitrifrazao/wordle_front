import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

// components
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

interface WordleProps {
  user_id: string | null;
}

export default function Wordle({ user_id }: WordleProps): JSX.Element {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    solution,
    handleKeyup,
  } = useWordle({ user_id });
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
      {showModal && (
        <Modal isCorrect={isCorrect} solution={solution} turn={turn} />
      )}
    </div>
  );
}
