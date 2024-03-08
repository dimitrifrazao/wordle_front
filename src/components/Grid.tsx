import Row from "./Row";
import { Letter } from "./Shared";

interface GridInput {
  guesses: Letter[][];
  currentGuess: string;
  turn: number;
}

function Grid({ guesses, currentGuess, turn }: GridInput): JSX.Element {
  return (
    <div>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return (
            <Row key={i} guess={[]} currentGuess={currentGuess} rowIndex={i} />
          );
        }
        return <Row key={i} guess={guess} currentGuess={""} rowIndex={i} />;
      })}
    </div>
  );
}

export default Grid;
