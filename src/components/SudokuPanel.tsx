import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

type Board = number[][];
type Difficulty = "easy" | "medium" | "hard";
type CellPosition = { row: number; col: number } | null;

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const REMOVALS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 40,
  medium: 48,
  hard: 54,
};

const fadedRule = {
  background:
    "linear-gradient(90deg, rgba(58,10,15,0) 0%, rgba(58,10,15,0.95) 10%, rgba(58,10,15,1) 50%, rgba(58,10,15,0.95) 90%, rgba(58,10,15,0) 100%)",
} as const;

const createEmptyBoard = (): Board =>
  Array.from({ length: 9 }, () => Array(9).fill(0));

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const isPlacementValid = (
  board: Board,
  row: number,
  col: number,
  value: number
) => {
  for (let index = 0; index < 9; index += 1) {
    if (index !== col && board[row][index] === value) {
      return false;
    }

    if (index !== row && board[index][col] === value) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let currentRow = startRow; currentRow < startRow + 3; currentRow += 1) {
    for (let currentCol = startCol; currentCol < startCol + 3; currentCol += 1) {
      if (
        (currentRow !== row || currentCol !== col) &&
        board[currentRow][currentCol] === value
      ) {
        return false;
      }
    }
  }

  return true;
};

const fillBoard = (board: Board): boolean => {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] !== 0) {
        continue;
      }

      for (const value of shuffle(DIGITS)) {
        if (!isPlacementValid(board, row, col, value)) {
          continue;
        }

        board[row][col] = value;

        if (fillBoard(board)) {
          return true;
        }

        board[row][col] = 0;
      }

      return false;
    }
  }

  return true;
};

const generateSolvedBoard = (): Board => {
  const board = createEmptyBoard();
  fillBoard(board);
  return board;
};

const createPuzzle = (solution: Board, difficulty: Difficulty): Board => {
  const puzzle = cloneBoard(solution);
  const positions = shuffle(Array.from({ length: 81 }, (_, index) => index));
  const targetRemovals = REMOVALS_BY_DIFFICULTY[difficulty];

  positions.slice(0, targetRemovals).forEach((position) => {
    const row = Math.floor(position / 9);
    const col = position % 9;
    puzzle[row][col] = 0;
  });

  return puzzle;
};

const getFirstEditableCell = (board: Board): CellPosition => {
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) {
        return { row, col };
      }
    }
  }

  return null;
};

const toCellKey = (row: number, col: number) => `${row}-${col}`;

const getConflictKeys = (board: Board) => {
  const conflicts = new Set<string>();

  const markDuplicates = (
    cells: Array<{ row: number; col: number; value: number }>
  ) => {
    const grouped = new Map<number, Array<{ row: number; col: number }>>();

    cells.forEach(({ row, col, value }) => {
      if (value === 0) {
        return;
      }

      const entries = grouped.get(value) ?? [];
      entries.push({ row, col });
      grouped.set(value, entries);
    });

    grouped.forEach((entries) => {
      if (entries.length < 2) {
        return;
      }

      entries.forEach(({ row, col }) => {
        conflicts.add(toCellKey(row, col));
      });
    });
  };

  for (let row = 0; row < 9; row += 1) {
    markDuplicates(
      board[row].map((value, col) => ({
        row,
        col,
        value,
      }))
    );
  }

  for (let col = 0; col < 9; col += 1) {
    markDuplicates(
      board.map((currentRow, row) => ({
        row,
        col,
        value: currentRow[col],
      }))
    );
  }

  for (let startRow = 0; startRow < 9; startRow += 3) {
    for (let startCol = 0; startCol < 9; startCol += 3) {
      const cells: Array<{ row: number; col: number; value: number }> = [];

      for (let row = startRow; row < startRow + 3; row += 1) {
        for (let col = startCol; col < startCol + 3; col += 1) {
          cells.push({
            row,
            col,
            value: board[row][col],
          });
        }
      }

      markDuplicates(cells);
    }
  }

  return conflicts;
};

const getIncorrectKeys = (board: Board, puzzle: Board, solution: Board) => {
  const incorrect = new Set<string>();

  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (puzzle[row][col] !== 0 || board[row][col] === 0) {
        continue;
      }

      if (board[row][col] !== solution[row][col]) {
        incorrect.add(toCellKey(row, col));
      }
    }
  }

  return incorrect;
};

const countFilledCells = (board: Board) =>
  board.flat().filter((value) => value !== 0).length;

const formatElapsedTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const createNewGame = (difficulty: Difficulty) => {
  const solution = generateSolvedBoard();
  const puzzle = createPuzzle(solution, difficulty);

  return {
    board: cloneBoard(puzzle),
    difficulty,
    mistakes: 0,
    puzzle,
    selectedCell: getFirstEditableCell(puzzle),
    solution,
    startedAt: Date.now(),
    statusMessage: `New ${difficulty} puzzle ready.`,
    completedAt: null as number | null,
  };
};

const SudokuPanel = () => {
  const [game, setGame] = useState(() => createNewGame("medium"));
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (game.completedAt) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [game.completedAt]);

  const conflictKeys = useMemo(() => getConflictKeys(game.board), [game.board]);
  const incorrectKeys = useMemo(
    () => getIncorrectKeys(game.board, game.puzzle, game.solution),
    [game.board, game.puzzle, game.solution]
  );

  const givensCount = useMemo(() => countFilledCells(game.puzzle), [game.puzzle]);
  const filledCount = useMemo(() => countFilledCells(game.board), [game.board]);
  const remainingCount = 81 - filledCount;
  const elapsedSeconds = Math.floor(
    ((game.completedAt ?? now) - game.startedAt) / 1000
  );

  const setSelectedCell = (row: number, col: number) => {
    setGame((currentGame) => ({
      ...currentGame,
      selectedCell: { row, col },
    }));
  };

  const startNewGame = (difficulty: Difficulty) => {
    setGame(createNewGame(difficulty));
    setNow(Date.now());
  };

  const resetBoard = () => {
    setGame((currentGame) => ({
      ...currentGame,
      board: cloneBoard(currentGame.puzzle),
      completedAt: null,
      mistakes: 0,
      selectedCell: getFirstEditableCell(currentGame.puzzle),
      startedAt: Date.now(),
      statusMessage: "Board reset.",
    }));
    setNow(Date.now());
  };

  const moveSelection = (rowDelta: number, colDelta: number) => {
    setGame((currentGame) => {
      if (!currentGame.selectedCell) {
        return currentGame;
      }

      const nextRow = Math.max(
        0,
        Math.min(8, currentGame.selectedCell.row + rowDelta)
      );
      const nextCol = Math.max(
        0,
        Math.min(8, currentGame.selectedCell.col + colDelta)
      );

      return {
        ...currentGame,
        selectedCell: { row: nextRow, col: nextCol },
      };
    });
  };

  const updateCellValue = (value: number) => {
    setGame((currentGame) => {
      const selectedCell = currentGame.selectedCell;

      if (!selectedCell || currentGame.completedAt) {
        return currentGame;
      }

      const { row, col } = selectedCell;

      if (currentGame.puzzle[row][col] !== 0) {
        return {
          ...currentGame,
          statusMessage: "That number is part of the original puzzle.",
        };
      }

      if (currentGame.board[row][col] === value) {
        return currentGame;
      }

      const board = cloneBoard(currentGame.board);
      board[row][col] = value;

      const conflicts = getConflictKeys(board);
      const incorrect = getIncorrectKeys(
        board,
        currentGame.puzzle,
        currentGame.solution
      );
      const solved =
        countFilledCells(board) === 81 &&
        conflicts.size === 0 &&
        incorrect.size === 0;
      const wrongAttempt =
        value !== 0 && value !== currentGame.solution[row][col];

      return {
        ...currentGame,
        board,
        completedAt: solved ? Date.now() : null,
        mistakes: currentGame.mistakes + (wrongAttempt ? 1 : 0),
        statusMessage: solved
          ? "Puzzle solved!"
          : value === 0
            ? "Cell cleared."
            : wrongAttempt
              ? "That entry does not fit yet."
              : "Nice move.",
      };
    });
  };

  const handleCellKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    row: number,
    col: number
  ) => {
    setSelectedCell(row, col);

    if (/^[1-9]$/.test(event.key)) {
      event.preventDefault();
      updateCellValue(Number(event.key));
      return;
    }

    switch (event.key) {
      case "Backspace":
      case "Delete":
      case "0":
        event.preventDefault();
        updateCellValue(0);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveSelection(-1, 0);
        break;
      case "ArrowDown":
        event.preventDefault();
        moveSelection(1, 0);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveSelection(0, -1);
        break;
      case "ArrowRight":
        event.preventDefault();
        moveSelection(0, 1);
        break;
      default:
        break;
    }
  };

  return (
    <section className="rounded-[1.35rem] border-[3px] border-[#140606] bg-paper px-4 py-5 md:px-6">
      <div className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-typewriter text-[10px] uppercase tracking-[0.24em] text-[#5b2620]">
            Puzzle Corner
          </p>
          <h4 className="text-[1.8rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.24em] text-[#140606] md:text-[2.2rem]">
            Sudoku
          </h4>
        </div>
        <p className="max-w-[30rem] font-serif text-sm leading-relaxed text-[#1f1110]">
          Editable cells, live validation, generated puzzles, and game state are all live
          here now. Click a square or use your keyboard to play.
        </p>
      </div>
      <div className="h-[2px] w-full" style={fadedRule} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,24rem)_1fr]">
        <div className="mx-auto w-full max-w-[24rem]">
          <div className="grid grid-cols-9 border-[3px] border-[#140606]">
            {game.board.flatMap((rowValues, row) =>
              rowValues.map((value, col) => {
                const key = toCellKey(row, col);
                const isGiven = game.puzzle[row][col] !== 0;
                const isSelected =
                  game.selectedCell?.row === row && game.selectedCell?.col === col;
                const isRelated = Boolean(
                  game.selectedCell &&
                    (game.selectedCell.row === row ||
                      game.selectedCell.col === col ||
                      (Math.floor(game.selectedCell.row / 3) === Math.floor(row / 3) &&
                        Math.floor(game.selectedCell.col / 3) === Math.floor(col / 3)))
                );
                const hasError =
                  conflictKeys.has(key) || incorrectKeys.has(key);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCell(row, col)}
                    onKeyDown={(event) => handleCellKeyDown(event, row, col)}
                    className="flex aspect-square items-center justify-center font-tabloid text-xl outline-none transition-colors"
                    style={{
                      borderRight:
                        col === 8
                          ? "none"
                          : col % 3 === 2
                            ? "3px solid #140606"
                            : "1px solid rgba(20, 6, 6, 0.35)",
                      borderBottom:
                        row === 8
                          ? "none"
                          : row % 3 === 2
                            ? "3px solid #140606"
                            : "1px solid rgba(20, 6, 6, 0.35)",
                      backgroundColor: isSelected
                        ? "rgba(91, 38, 32, 0.34)"
                        : hasError
                          ? "rgba(160, 32, 32, 0.24)"
                          : isGiven
                            ? "rgba(20, 6, 6, 0.12)"
                            : isRelated
                              ? "rgba(91, 38, 32, 0.16)"
                              : "transparent",
                      color: isGiven ? "#140606" : "#5b2620",
                      fontWeight: isGiven ? 500 : 400,
                      boxShadow: isSelected
                        ? "inset 0 0 0 2px rgba(91, 38, 32, 0.65)"
                        : hasError
                          ? "inset 0 0 0 2px rgba(160, 32, 32, 0.45)"
                          : "none",
                    }}
                  >
                    {value || ""}
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {DIGITS.map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => updateCellValue(digit)}
                className="rounded-[0.9rem] border-2 border-[#140606] px-3 py-2 font-typewriter text-lg text-[#140606] transition-colors hover:bg-[#140606] hover:text-paper"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => updateCellValue(0)}
              className="col-span-2 rounded-[0.9rem] border-2 border-[#140606] px-3 py-2 font-typewriter text-lg text-[#140606] transition-colors hover:bg-[#140606] hover:text-paper"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={resetBoard}
              className="col-span-3 rounded-[0.9rem] border-2 border-[#140606] px-3 py-2 font-typewriter text-lg text-[#140606] transition-colors hover:bg-[#140606] hover:text-paper"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {(["easy", "medium", "hard"] as Difficulty[]).map((difficulty) => (
              <button
                key={difficulty}
                type="button"
                onClick={() => startNewGame(difficulty)}
                className="rounded-[0.95rem] border-2 border-[#140606] px-4 py-3 font-typewriter text-sm uppercase tracking-[0.18em] transition-colors"
                style={{
                  backgroundColor:
                    game.difficulty === difficulty ? "#140606" : "transparent",
                  color: game.difficulty === difficulty ? "#f5e6d3" : "#140606",
                }}
              >
                {difficulty}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[1rem] border border-[#140606]/35 px-3 py-3">
              <p className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Time
              </p>
              <p className="mt-1 text-[1.25rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.16em] text-[#140606]">
                {formatElapsedTime(elapsedSeconds)}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[#140606]/35 px-3 py-3">
              <p className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Mistakes
              </p>
              <p className="mt-1 text-[1.25rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.16em] text-[#140606]">
                {game.mistakes}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[#140606]/35 px-3 py-3">
              <p className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Givens
              </p>
              <p className="mt-1 text-[1.25rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.16em] text-[#140606]">
                {givensCount}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[#140606]/35 px-3 py-3">
              <p className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
                Left
              </p>
              <p className="mt-1 text-[1.25rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.16em] text-[#140606]">
                {remainingCount}
              </p>
            </div>
          </div>

          <div className="rounded-[1.1rem] border-[3px] border-[#140606] px-4 py-4">
            <p className="text-[1.05rem] font-semibold not-italic uppercase leading-[1.02] tracking-[0.2em] text-[#140606]">
              Live Validation
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-[#1f1110]">
              Repeated numbers and incorrect guesses are flagged automatically. Given
              cells are locked, editable cells can be filled by clicking or typing, and
              the game ends when the full board matches the generated solution.
            </p>
          </div>

          <div className="rounded-[1.1rem] border border-[#140606]/35 px-4 py-4">
            <p className="font-typewriter text-[10px] uppercase tracking-[0.22em] text-[#5b2620]">
              Status
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-[#1f1110]">
              {game.statusMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SudokuPanel;
