import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultBoardState } from './constants';

type Player = 'X' | 'O' | '';
export type Cell = { row: number; col: number; value: Player };
export type StateModel = {
  currentPlayer: Player;
  board: Cell[];
  gameOver: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameState = new BehaviorSubject<StateModel>(defaultBoardState);
  gameState$ = this.gameState.asObservable();

  makeMove(row: number, col: number) {
    let state = this.gameState.value;

    if (!state.gameOver) {
      state = this.updateBoard(row, col, state);
      this.updateGameOver(state);
      this.updateCurrentPlayer(this.gameState.value);
    }
  }

  private updateBoard(row: number, col: number, state: StateModel) {
    const currentPosition = row * 3 + col;
    const currentValue = state.board[currentPosition].value;

    if (!currentValue) {
      state.board[currentPosition].value = state.currentPlayer;
    }

    return state;
  }

  private updateCurrentPlayer(state: StateModel) {
    return (state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X');
  }

  private checkGameOver(state: StateModel) {
    return !!this.calculateWinner(state);
  }

  private updateGameOver(state: StateModel) {
    state.gameOver = this.checkGameOver(state);
    this.gameState.next(state);
  }

  private calculateWinner(state: StateModel) {
    const { board } = state;
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      const boardA = board[a].value;

      if (boardA && boardA === board[b].value && boardA === board[c].value) {
        console.log('winner!', boardA);
        return boardA;
      }
    }
    return null;
  }
}
