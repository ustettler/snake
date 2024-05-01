import React, { useState, useEffect } from 'react';
import './App.css';

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 30;

const App = () => {
  const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
  const [food, setFood] = useState({ row: 15, col: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const moveSnake = setInterval(() => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.row--;
          break;
        case 'DOWN':
          head.row++;
          break;
        case 'LEFT':
          head.col--;
          break;
        case 'RIGHT':
          head.col++;
          break;
        default:
          break;
      }

      if (head.row < 0 || head.row >= ROWS || head.col < 0 || head.col >= COLS) {
        clearInterval(moveSnake);
        setGameOver(true);
        return;
      }

      if (head.row === food.row && head.col === food.col) {
        setFood({
          row: Math.floor(Math.random() * ROWS),
          col: Math.floor(Math.random() * COLS),
        });
      } else {
        newSnake.pop();
      }

      newSnake.unshift(head);
      setSnake(newSnake);
    }, 300);

    return () => {
      clearInterval(moveSnake);
    };
  }, [snake, direction, food]);

  const renderGrid = () => {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        grid.push(
          <div
            key={`${i}-${j}`}
            className={`cell ${snake.some((s) => s.row === i && s.col === j) ? 'snake' : ''} ${
              food.row === i && food.col === j ? 'food' : ''
            }`}
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
          ></div>
        );
      }
    }
    return grid;
  };

  return (

    <div className="App">
      <div className="grid">{renderGrid()}</div>
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
};

export default App;
