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

  constructor(private gameService: GameService) {
    // preload
  }

  startGame() {}

  ngOnInit() {
    this.subs.push(
      this.gameService.gameState$.subscribe((state) => {
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;
        this.cells = state.board;
        this.playFx();
      })
    );
  }

  private playFx() {
    const { audioPlayer, audioGameOver } = this.getAudio();

    if (!this.gameOver) {
      return audioPlayer.play();
    }

    return audioGameOver.play();
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

  // @todo use Angular's ResolverService to preload audio files
  // eg. https://stackoverflow.com/questions/58528417/how-to-preload-audio-files-in-angular-project
  private getAudio() {
    const audioGameOver = new Audio('/assets/fx/win.ogg');
    const audioX = new Audio('/assets/fx/plop-x.ogg');
    const audioO = new Audio('/assets/fx/plop-y.ogg');
    const audioPlayer = this.currentPlayer === 'X' ? audioX : audioO;

    return { audioPlayer, audioGameOver };
  }
}
