import { Component, OnInit } from '@angular/core';
import { GameService } from './board.service';

@Component({
  selector: 'app-game-board',
  styleUrls: ['./board.component.css'],
  template: `<div class="game-board">
    <div
      *ngFor="let cell of cells"
      (click)="makeMove(cell.row, cell.col)"
      class="cell"
    >
      {{ cell.value }}
    </div>
  </div>`,
})
export class GameBoardComponent implements OnInit {
  cells: any[] = []

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.gameState$.subscribe((state) => {
      this.cells = state.board;
    });
  }

  makeMove(row: number, col: number) {
    this.gameService.makeMove(row, col);
  }
}
