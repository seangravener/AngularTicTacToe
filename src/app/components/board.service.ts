import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

type StateModel = { currentPlayer: 'X' | 'O'; board: any[]; gameOver: boolean };
const defaultState: StateModel = {
  currentPlayer: 'X',
  board: [
    { row: 0, col: 0, value: '[ ]' },
    { row: 0, col: 1, value: '[ ]' },
    { row: 0, col: 2, value: '[ ]' },
    { row: 1, col: 0, value: '[ ]' },
    { row: 1, col: 1, value: '[ ]' },
    { row: 1, col: 2, value: '[ ]' },
    { row: 2, col: 0, value: '[ ]' },
    { row: 2, col: 1, value: '[ ]' },
    { row: 2, col: 2, value: '[ ]' },
  ],
  gameOver: false,
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameState = new BehaviorSubject<StateModel>(defaultState);
  gameState$ = this.gameState.asObservable();

  constructor() {}

  makeMove(row: number, col: number) {
    const state = this.gameState.value;
    const position = row * 3 + col;

    // if (state.board[position].value === '[ ]' && !state.gameOver) {
      if (!state.gameOver) {
      state.board[position].value = state.currentPlayer;
      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

      state.gameOver = this.checkGameOver();
      this.gameState.next(state);
    }

    console.log(state);
  }

  checkGameOver() {
    return false;
  }
}
