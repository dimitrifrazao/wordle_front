import React, { useEffect, useState } from "react";
import { HandleKeyup } from "../hooks/useWordle";

interface Letter {
  key: string;
}

interface KeypadProps {
  usedKeys: { [key: string]: string };
  handleKeyup: HandleKeyup;
}

function Keypad({ usedKeys, handleKeyup }: KeypadProps): JSX.Element {
  const [letters, setLetters] = useState<Letter[] | null>(null);

  useEffect(() => {
    const lowercaseLetters: Letter[] = [];
    for (let i = 97; i <= 122; i++) {
      const letter: Letter = { key: String.fromCharCode(i) };
      lowercaseLetters.push(letter);
    }
    setLetters(lowercaseLetters);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value: string | null = event.currentTarget.textContent;
    if (value !== null) {
      handleKeyup({ key: value });
    }
  };

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          return (
            <div key={letter.key} className={color} onClick={handleClick}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}

export default Keypad;
