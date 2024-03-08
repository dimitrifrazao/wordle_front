import { KeyColor, Letter } from "./Shared";

function GetCornerTag(rowIndex: number, i: number): string {
  if ((rowIndex === 0 || rowIndex === 5) && (i === 0 || i === 4)) {
    const preffix = rowIndex === 0 ? "top" : "bot";
    const suffix = i === 0 ? "-left" : "-right";
    return preffix + suffix;
  }
  return "";
}

interface RowInput {
  guess: Letter[];
  currentGuess: string;
  rowIndex: number;
}

function BuildDivs(
  rowClass: string,
  guess: Letter[],
  rowIndex: number
): JSX.Element {
  return (
    <div className={rowClass}>
      {guess.map((letter, i) => (
        <div key={i} className={letter.color} id={GetCornerTag(rowIndex, i)}>
          {letter.key}
        </div>
      ))}
    </div>
  );
}

function Row({ guess, currentGuess, rowIndex }: RowInput): JSX.Element {
  if (guess && guess.length > 0) {
    return BuildDivs("row past", guess, rowIndex);
  } else if (currentGuess.length > 0) {
    currentGuess += " ".repeat(5 - currentGuess.length);
    const letters: Letter[] = [];
    currentGuess.split("").forEach((char) => {
      const color = char === " " ? KeyColor.empty : KeyColor.filled;
      const letter: Letter = { key: char, color: color };
      letters.push(letter);
    });
    return BuildDivs("row current", letters, rowIndex);
  } else {
    const emptyLetters: Letter[] = [];
    for (let i = 0; i < 5; i++) {
      emptyLetters.push({ key: "", color: KeyColor.empty });
    }
    return BuildDivs("row", emptyLetters, rowIndex);
  }
}

export default Row;
