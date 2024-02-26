export interface Letter {
  key: string;
  color: string;
}

interface RowProps {
  guess: Letter[] | null;
  currentGuess: string | null;
  rowIndex: number;
}

function Side(i: number): string {
  if (i == 0) return "left";
  else if (i == 4) return "right";
  return "";
}

function Row({ guess, currentGuess, rowIndex }: RowProps): JSX.Element {
  let tag = "";
  if (rowIndex == 0 || rowIndex == 5) {
    tag = rowIndex == 0 ? "top" : "bot";
  }
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, i) => (
          <div key={i} className={letter.color} id={tag + "-" + Side(i)}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  } else if (currentGuess) {
    const letters = currentGuess.split("");
    const remain = new Array(5 - letters.length).fill(null);

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <div key={i} className="filled" id={tag + "-" + Side(i)}>
            {letter}
          </div>
        ))}
        {remain.map((_, i) => (
          <div key={i} id={tag + "-" + Side(letters.length + i)} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="row">
        <div id={tag + "-" + Side(0)}></div>
        <div></div>
        <div></div>
        <div></div>
        <div id={tag + "-" + Side(4)}></div>
      </div>
    );
  }
}

export default Row;
