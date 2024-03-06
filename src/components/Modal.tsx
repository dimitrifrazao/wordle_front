interface ModalProps {
  isCorrect: boolean;
  solution: string | null;
  turn: number;
}
function handleClick() {
  window.location.reload();
}

function Modal({ isCorrect, solution, turn }: ModalProps): JSX.Element {
  const topText = isCorrect
    ? "You Win!"
    : "Sorry, all your guesses were wrong.";
  const turnText = turn == 1 ? " guess!" : " guesses.";
  const winText = "You found the solution in " + turn.toString();
  const botText = isCorrect ? winText + turnText : "";
  return (
    <div className="modal">
      <div className="modal_div">
        <p>{topText}</p>
        <p className="solution">{solution}</p>
        <p>{botText}</p>
        <button id="replay_button" onClick={handleClick}>
          REPLAY
        </button>
      </div>
    </div>
  );
}

export default Modal;
