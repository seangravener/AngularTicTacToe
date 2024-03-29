import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newBoardState, WinningCombos } from './constants';
import { SoundService } from './sound.service';

type Player = 'X' | 'O' | 'XO' | '';
export type Cell = { row: number; col: number; value: Player };
export type StateModel = {
  board: Cell[];
  gameOver: boolean;
  currentPlayer: Player;
};

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameState = new BehaviorSubject<StateModel>(newBoardState());
  gameState$ = this.gameState.asObservable();

  constructor(private soundService: SoundService) {}

  makeMove(row: number, col: number) {
    let state = { ...this.gameState.value };
    const toPosition = row * 3 + col;
    const currentValue = state.board[toPosition].value;

    if (!currentValue && !state.gameOver) {
      state = this.updateBoard(row, col, state);
      state = this.checkWinGame(state);

      if (!state.gameOver) {
        state = this.updateCurrentPlayer(state);
      }
    }

    this.gameState.next(state);
  }

  resetGame() {
    this.gameState.next(newBoardState());
  }

  private updateBoard(row: number, col: number, state: StateModel) {
    state.board[row * 3 + col].value = state.currentPlayer;
    return { ...state };
  }

  private updateCurrentPlayer(state: StateModel) {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
    return { ...state };
  }

  private checkWinGame(state: StateModel) {
    const winner = this.calculateWinner(state);
    if (winner) {
      state.currentPlayer = winner;
      state.gameOver = true;

      // this.soundService.playFx('gameover')
    }

    return { ...state };
  }

  private calculateWinner(state: StateModel) {
    const { board } = state;

    for (let i = 0; i < WinningCombos.length; i++) {
      const [a, b, c] = WinningCombos[i];
      const boardA = board[a].value;

      if (boardA && boardA === board[b].value && boardA === board[c].value) {
        return boardA;
      }
    }

    // check tie game
    const count = state.board.filter((row) => row.value).length;
    if (count >= 9) {
      return 'XO';
    }

    return '';
  }
}
