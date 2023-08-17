import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Square = ({ value, onCLick }) => {
  return (
    <button
      className="border-2 border-blue-500 h-32 w-32 text-6xl block sm:h-16 sm:w-16"
      onClick={onCLick}
    >
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [check, setCheck] = useState("X");

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [steps, setSteps] = useState([squares]);

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function whoWin() {
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (
        squares[a] != null &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  return (
    <div>
      <div className="grid place-items-center text-blue-500 text-xl underline">
        <Link to="/">Back to homepage</Link>
      </div>
      <div className="flex flex-row justify-evenly items-center h-screen text-2xl font-bold">
        <div className="basis-1/4">
          {whoWin() === null
            ? `Next Player : ${check}`
            : `Winner : ${whoWin()}`}
        </div>
        <div className=" w-fit grid grid-cols-3 grid-rows-3">
          {squares.map((value, index) => {
            return (
              <Square
                key={index}
                value={value}
                onCLick={() => {
                  if (value === null && whoWin() === null) {
                    let newArr = [...squares];
                    newArr[index] = check;
                    setSquares(newArr);
                    setSteps([...steps, newArr]);
                    setCheck(() => {
                      if (check === "X") return "O";
                      else return "X";
                    });
                  }
                }}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-1 basis-1/4">
          <Button
            variant="contained"
            onClick={() => {
              setSquares(Array(9).fill(null));
              setSteps(Array(1).fill(Array(9).fill(null)));
            }}
          >
            Start Game
          </Button>
          {steps.map((step, index) => {
            return (
              <button
                key={index}
                className="bg-black/10"
                onClick={() => {
                  setSquares(step);
                  let arr = [...steps];
                  let newArr = arr.filter((ele, num) => num <= index);
                  setSteps(newArr);
                }}
              >
                {index === 0 ? null : `Return step #${index}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
