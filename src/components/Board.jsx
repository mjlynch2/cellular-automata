import { useEffect, useState, useRef } from "react";
import { getBoard } from "../api/apiMethods";
import { Controls } from "./Controls";
import Header from "./Header";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [generations, setGenerations] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [vw, setVw] = useState(0);
  const ref = useRef();

  const size = board.length || 0;

  const styles = {
    grid: {
      display: "inline-grid",
      border: "1px solid #424242",
      gridGap: "1px",
      backgroundColor: "#424242",
      gridTemplateColumns: `repeat(${board.length}, ${vw / size - 1}px)`,
      gridTemplateRows: `repeat(${board.length}, ${vw / size - 1}px)`,
    },
    cellDead: {
      width: `${vw / size - 1}px`,
      height: `${vw / size - 1}px`,
      background: "#6d6d6d",
    },
    cellAlive: {
      width: `${vw / size - 1}px`,
      height: `${vw / size - 1}px`,
      background: `hsla(${generations}, 100%, 78%, 1)`,
    },
  };

  const getContainerWidth = () => ref.current.offsetWidth;

  useEffect(() => {
    const fetch = async () => {
      const response = await getBoard();
      setBoard(response.data.board);
      setGenerations(response.data.generations);
      setIsRunning(response.data.isRunning);
      setSpeed(response.data.speed);
    };
    const generate = setInterval(() => {
      fetch();
    }, speed);
    return () => clearInterval(generate);
  }, [speed]);

  useEffect(() => {
    const handleResize = () => {
      setVw(getContainerWidth());
    };

    if (ref.current) {
      setVw(getContainerWidth());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return (
    <>
      <Header generations={generations} />
      <div className="row g-0 align-items-center justify-content-center">
        <div className="col-1"></div>
        <div className="col-10  " ref={ref}>
          <div style={styles.grid}>
            {board.length !== 0
              ? board.map((row, i) =>
                  row.map((cell, j) => (
                    <div
                      key={j}
                      style={cell === 0 ? styles.cellDead : styles.cellAlive}
                    ></div>
                  ))
                )
              : "Loading"}
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      <Controls
        generations={generations}
        isRunning={isRunning}
        size={board.length}
        speed={speed}
      />
    </>
  );
};

export default Board;
