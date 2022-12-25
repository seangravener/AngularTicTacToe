import { StateModel } from './board.service';

export const NewBoardState: StateModel = {
  currentPlayer: 'X',
  gameOver: false,
  board: [
    { row: 0, col: 0, value: '' },
    { row: 0, col: 1, value: '' },
    { row: 0, col: 2, value: '' },
    { row: 1, col: 0, value: '' },
    { row: 1, col: 1, value: '' },
    { row: 1, col: 2, value: '' },
    { row: 2, col: 0, value: '' },
    { row: 2, col: 1, value: '' },
    { row: 2, col: 2, value: '' },
  ],
};

export const WinningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
