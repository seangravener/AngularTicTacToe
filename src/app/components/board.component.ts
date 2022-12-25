import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cell, GameService } from './board.service';

@Component({
  selector: 'app-game-board',
  styleUrls: ['./board.component.css'],
  templateUrl: 'board.component.html',
})
export class GameBoardComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  gameOver = false;
  cells: Cell[] = [];
  currentPlayer = 'X';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.subs.push(
      this.gameService.gameState$.subscribe((state) => {
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;
        this.cells = state.board;
      })
    );
  }

  makeMove(row: number, col: number) {
    if (!this.gameOver) {
      this.gameService.makeMove(row, col);
    }
  }

  resetGame() {
    this.gameService.resetGame();
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe;
    }
  }
}
