interface ModalProps {
  isCorrect: boolean;
  solution: string | null;
  turn: number;
}
function handleClick() {
  window.location.reload();
}

function Modal({ isCorrect, solution, turn }: ModalProps): JSX.Element {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <p>You Win!</p>
          <p>The word is:</p>
          <p className="solution">{solution}</p>
          <p>
            You found the solution in {turn} {turn == 1 ? "guess!" : "guesses."}
          </p>
          <button onClick={handleClick}>Replay?</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <p>Sorry, all your guesses were wrong.</p>
          <p>The word is:</p>
          <p className="solution">{solution}</p>
          <button onClick={handleClick}>Replay?</button>
        </div>
      )}
    </div>
  );
}

export default Modal;
