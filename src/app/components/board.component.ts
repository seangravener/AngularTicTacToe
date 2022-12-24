import { Component, OnInit } from '@angular/core';
import { Cell, GameService } from './board.service';

@Component({
  selector: 'app-game-board',
  styleUrls: ['./board.component.css'],
  templateUrl: 'board.component.html',
})
export class GameBoardComponent implements OnInit {
  gameOver = false;
  cells: Cell[] = [];
  currentPlayer = 'X';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.gameState$.subscribe((state) => {
      this.currentPlayer = state.currentPlayer;
      this.cells = state.board;
      this.gameOver = state.gameOver;
    });
  }

  makeMove(row: number, col: number) {
    if (!this.gameOver) {
      this.gameService.makeMove(row, col);
    }
  }
}
