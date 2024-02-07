import { useState, useEffect } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isBlueTurn, setIsBlueTurn] = useState(true);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  useEffect(() => {
    // Load scores from local storage
    const storedScores = JSON.parse(
      localStorage.getItem("ticTacToeScores")
    ) || { blue: 0, red: 0 };
    setBlueScore(storedScores.blue);
    setRedScore(storedScores.red);
  }, []);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isBlueTurn ? "X" : "O";
    setBoard(newBoard);

    // Check for a winner
    const winner = calculateWinner(newBoard);
    if (winner) {
      updateScore(winner);
      setTimeout(() => {
        setBoard(Array(9).fill(null));
      }, 1000);
    } else {
      setIsBlueTurn(!isBlueTurn);
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const updateScore = (winner) => {
    if (winner === "X") {
      setBlueScore(blueScore + 1);
    } else {
      setRedScore(redScore + 1);
    }

    // Save scores to local storage
    const scoresToSave = {
      blue: blueScore + (winner === "X" ? 1 : 0),
      red: redScore + (winner === "O" ? 1 : 0),
    };
    localStorage.setItem("ticTacToeScores", JSON.stringify(scoresToSave));
  };

  return (
    <div>
      <div>
        <span>Blue Score: {blueScore}</span> |{" "}
        <span>Red Score: {redScore}</span>
      </div>
      <div className="board">
        {board.map((square, index) => (
          <div
            className={`cell ${square}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {square}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
