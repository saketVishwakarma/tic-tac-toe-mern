import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, Box, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';

const theme = createTheme();

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('ttt_score');
    return saved ? JSON.parse(saved) : { X: 0, O: 0 };
  });

  const clickSound = useRef(new Audio('/sounds/click.wav'));
  const winSound = useRef(new Audio('/sounds/win.wav'));
  const resetSound = useRef(new Audio('/sounds/reset.wav'));

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('ttt_score', JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    for (const [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setWinningCells([a, b, c]);
        setScore(prev => ({ ...prev, [board[a]]: prev[board[a]] + 1 }));

        winSound.current.pause();
        winSound.current.currentTime = 0;
        winSound.current.play();
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner('Draw');
    }
  }, [board]);

  const handleClick = (i) => {
    if (board[i] || winner) return;

    clickSound.current.pause();
    clickSound.current.currentTime = 0;
    clickSound.current.play();

    const newBoard = [...board];
    newBoard[i] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    resetSound.current.pause();
    resetSound.current.currentTime = 0;
    resetSound.current.play();

    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningCells([]);
    setTime(0);
  };

  const getCellGradient = (value, index) => {
    if (winningCells.includes(index)) {
      return 'linear-gradient(135deg, #a5d6a7, #66bb6a)';
    }
    if (value === 'X') {
      return 'linear-gradient(135deg, #ffccbc, #ff8a65)';
    }
    if (value === 'O') {
      return 'linear-gradient(135deg, #c5cae9, #7986cb)';
    }
    return 'linear-gradient(135deg, #e0f7fa, #80deea)';
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" sx={{ textAlign: 'center', mt: 4, px: 1 }}>
        <Typography variant="h5" gutterBottom>Tic Tac Toe</Typography>
        <Typography variant="subtitle2">
          Turn: {isXTurn ? 'X' : 'O'} | ⏱ {time}s
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            mt: 2,
          }}
        >
          {board.map((cell, i) => (
            <Box
              key={i}
              onClick={() => handleClick(i)}
              sx={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
                background: getCellGradient(cell, i),
                border: '1px solid #ccc',
                cursor: board[i] || winner ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s ease',
                '&:hover': {
                  background: board[i]
                    ? getCellGradient(cell, i)
                    : 'linear-gradient(135deg, #b2ebf2, #4dd0e1)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 32, sm: 40 },
                  fontWeight: 'bold',
                  color: '#01579b',
                  animation: winningCells.includes(i) ? 'bounce 0.4s ease-in-out infinite alternate' : 'none',
                }}
              >
                {cell}
              </Box>
            </Box>
          ))}
        </Box>

        {winner && (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleReset}
          startIcon={<ReplayIcon />}
          sx={{ mt: 2 }}
        >
          Reset Game
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Score — X: {score.X} | O: {score.O}
        </Typography>

        {/* Inline bounce animation */}
        <style>{`
          @keyframes bounce {
            0%   { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
        `}</style>
      </Container>
    </ThemeProvider>
  );
}
