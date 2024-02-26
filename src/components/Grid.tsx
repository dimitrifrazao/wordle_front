// components
import Row from "./Row";
import { Letter } from "./Row";

interface GridProps {
  guesses: Letter[][];
  currentGuess: string;
  turn: number;
}

function Grid({ guesses, currentGuess, turn }: GridProps): JSX.Element {
  return (
    <div>
      {guesses.map((guess, i) => {
        if (turn === i) {
          return (
            <Row
              key={i}
              guess={null}
              currentGuess={currentGuess}
              rowIndex={i}
            />
          );
        }
        return <Row key={i} guess={guess} currentGuess={null} rowIndex={i} />;
      })}
    </div>
  );
}

export default Grid;
