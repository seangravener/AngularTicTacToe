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
