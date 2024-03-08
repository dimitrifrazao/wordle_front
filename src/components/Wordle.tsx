import { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";

// components
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle(user_id: string): JSX.Element {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    newKeys,
    usedKeys,
    solution,
    handleKeyup,
  } = useWordle(user_id);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      {showModal && (
        <Modal isCorrect={isCorrect} solution={solution} turn={turn} />
      )}
      {!showModal && (
        <div>
          <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
          <Keypad
            newKeys={newKeys}
            usedKeys={usedKeys}
            handleKeyup={handleKeyup}
          />
        </div>
      )}
    </div>
  );
}
