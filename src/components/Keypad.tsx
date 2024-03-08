import React, { useEffect, useState } from "react";
import { HandleKeyup } from "../hooks/useWordle";
import { KeyColor } from "./Shared";

interface KeypadInput {
  newKeys: Set<string>;
  usedKeys: Map<string, KeyColor>;
  handleKeyup: HandleKeyup;
}

const CLASS_NAME = "keypad";
const lowercaseLetters: string[] = [];
for (let i = 97; i <= 122; i++) {
  lowercaseLetters.push(String.fromCharCode(i));
}
//const bounceKeys = new Set<string>();

function Keypad({ newKeys, usedKeys, handleKeyup }: KeypadInput): JSX.Element {
  const [letters, setLetters] = useState<string[]>();
  const [click, setClick] = useState<string>("");
  //const bounceKeys = useMemo(() => setBounceKeys(newWord), [newWord]);
  //const [bounceKeys, setBounceKeys] = useState<Set<string>>(new Set<string>());
  const [bounce, setBounce] = useState<boolean>(false);

  // function setBounceKeys(newWord: Letter[]) {
  //   //setBounce(true);
  //   console.log("works");
  //   const result = new Set<string>();
  //   newWord.forEach((letter) => {
  //     result.add(letter.key);
  //   });
  //   return result;
  // }

  //const usedKeys = useMemo(() => setUsedKeys(newWord), [newWord]);

  useEffect(() => {
    setLetters(lowercaseLetters);
  }, []);

  useEffect(() => {
    setBounce(true);
    setTimeout(() => {
      setBounce(false);
    }, 300);
  }, [newKeys]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const value: string | null =
      event.currentTarget.getAttribute("custom-attribute");
    if (value !== null) {
      setClick(value);
      handleKeyup({ key: value });
      setTimeout(() => {
        setClick("");
      }, 200);
    }
  };

  function getSubClassString(key: string): string {
    if (newKeys.has(key) && bounce) return " bounce";
    if (click === key) return " click";
    return "";
  }

  function createDiv(
    key: string,
    className: string,
    text: string
  ): JSX.Element {
    return (
      <div
        key={key}
        custom-attribute={key}
        className={className + getSubClassString(key)}
        onClick={handleClick}
      >
        {text}
      </div>
    );
  }

  function returnDivRange(start: number, end: number): JSX.Element[] {
    const divs: JSX.Element[] = [];
    if (letters) {
      letters.slice(start, end).map((letter) => {
        const color = usedKeys.get(letter);
        if (color !== undefined) {
          divs.push(createDiv(letter, color, letter));
        } else divs.push(createDiv(letter, KeyColor.empty, letter));
      });
    }
    return divs;
  }

  function getKeypadSubclass() {
    return "";
  }

  return (
    <div className={CLASS_NAME + getKeypadSubclass()}>
      {returnDivRange(0, 20)}
      {createDiv("Backspace", "delete", "Delete")}
      {returnDivRange(20, 26)}
      {createDiv("Enter", "enter", "Enter")}
    </div>
  );
}

export default Keypad;
