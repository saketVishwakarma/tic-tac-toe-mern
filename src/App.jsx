import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Typography, Box, Button, ToggleButton, ToggleButtonGroup, IconButton, Switch
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReplayIcon from '@mui/icons-material/Replay';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

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
  const [mode, setMode] = useState('human');
  const [difficulty, setDifficulty] = useState('easy');
  const [darkMode, setDarkMode] = useState(false);

  const clickSound = useRef(new Audio('/sounds/click.wav'));
  const winSound = useRef(new Audio('/sounds/win.wav'));
  const resetSound = useRef(new Audio('/sounds/reset.wav'));

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    typography: {
      allVariants: {
        color: darkMode ? '#eee' : '#111',
      },
    },
  });

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
        playSound(winSound);
        return;
      }
    }

    if (!board.includes(null) && !winner) {
      setWinner('Draw');
    }
  }, [board]);

  useEffect(() => {
    if (mode === 'ai' && !isXTurn && !winner) {
      const timeout = setTimeout(() => {
        const move = difficulty === 'hard' ? getBestMove(board) : getRandomMove(board);
        if (move !== null) {
          handleClick(move, true);
        }
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [isXTurn, mode, difficulty, board, winner]);

  const playSound = (ref) => {
    ref.current.pause();
    ref.current.currentTime = 0;
    ref.current.play();
  };

  const handleClick = (i, fromAI = false) => {
    if (board[i] || winner || (!isXTurn && mode === 'ai' && !fromAI)) return;
    playSound(clickSound);
    const newBoard = [...board];
    newBoard[i] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    playSound(resetSound);
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setWinningCells([]);
    setTime(0);
  };

  const handleModeChange = (_, newMode) => {
    if (newMode) {
      handleReset();
      setMode(newMode);
    }
  };

  const handleDifficultyChange = (_, newDifficulty) => {
    if (newDifficulty) setDifficulty(newDifficulty);
  };

  const getCellGradient = (value, index) => {
    if (winningCells.includes(index))
      return darkMode
        ? 'linear-gradient(135deg, #66bb6a, #2e7d32)'
        : 'linear-gradient(135deg, #a5d6a7, #66bb6a)';
    if (value === 'X')
      return darkMode
        ? 'linear-gradient(135deg, #d32f2f, #b71c1c)'
        : 'linear-gradient(135deg, #ffccbc, #ff8a65)';
    if (value === 'O')
      return darkMode
        ? 'linear-gradient(135deg, #3949ab, #1a237e)'
        : 'linear-gradient(135deg, #c5cae9, #7986cb)';
    return darkMode
      ? 'linear-gradient(135deg, #424242, #212121)'
      : 'linear-gradient(135deg, #e0f7fa, #80deea)';
  };

  const getRandomMove = (board) => {
    const empty = board.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
    return empty.length > 0 ? empty[Math.floor(Math.random() * empty.length)] : null;
  };

  const getBestMove = (board) => {
    const ai = 'O', human = 'X';
    const minimax = (b, isMax) => {
      const w = checkWinner(b);
      if (w === ai) return 10;
      if (w === human) return -10;
      if (!b.includes(null)) return 0;

      let best = isMax ? -Infinity : Infinity;
      b.forEach((_, i) => {
        if (b[i] === null) {
          b[i] = isMax ? ai : human;
          const score = minimax(b, !isMax);
          b[i] = null;
          best = isMax ? Math.max(score, best) : Math.min(score, best);
        }
      });
      return best;
    };

    let bestMove = null;
    let bestScore = -Infinity;
    board.forEach((_, i) => {
      if (board[i] === null) {
        board[i] = ai;
        const score = minimax(board, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    });
    return bestMove;
  };

  const checkWinner = (b) => {
    for (const [a, b1, c] of winningCombos)
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
     <Container
  maxWidth="xs"
  sx={{
    textAlign: 'center',
    mt: 4,
    px: 1,
    bgcolor: 'background.default',
    minHeight: '100vh',
  }}
>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Tic Tac Toe</Typography>
          <Box>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="primary">
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>

        <ToggleButtonGroup value={mode} exclusive onChange={handleModeChange} fullWidth>
          <ToggleButton value="human">
            <PersonIcon sx={{ mr: 1 }} /> Human
          </ToggleButton>
          <ToggleButton value="ai">
            <SmartToyIcon sx={{ mr: 1 }} /> Computer
          </ToggleButton>
        </ToggleButtonGroup>

        {mode === 'ai' && (
          <ToggleButtonGroup
            value={difficulty}
            exclusive
            onChange={handleDifficultyChange}
            fullWidth
            sx={{ mt: 2 }}
          >
            <ToggleButton value="easy">
              <EmojiEmotionsIcon sx={{ mr: 1 }} /> Easy
            </ToggleButton>
            <ToggleButton value="hard">
              <PsychologyIcon sx={{ mr: 1 }} /> Hard
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Turn: {isXTurn ? 'X' : 'O'} | ⏱ {time}s
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, mt: 2 }}>
          {board.map((cell, i) => (
            <Box
              key={i}
              onClick={() => handleClick(i)}
              sx={{
                width: '100%',
                paddingTop: '100%',
                position: 'relative',
                background: getCellGradient(cell, i),
                border: '1px solid #aaa',
                cursor: board[i] || winner ? 'not-allowed' : 'pointer',
                '&:hover': {
                  opacity: board[i] ? 1 : 0.85,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 28, sm: 36 },
                  fontWeight: 'bold',
                  color: darkMode ? '#fff' : '#111',
                  animation: winningCells.includes(i)
                    ? 'bounce 0.4s ease-in-out infinite alternate'
                    : 'none',
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
