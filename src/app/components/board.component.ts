import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, distinctUntilChanged, tap } from 'rxjs';
import { Cell, GameService, StateModel } from './board.service';

@Component({
  selector: 'app-game-board',
  styleUrls: ['./board.component.css'],
  templateUrl: 'board.component.html',
})
export class GameBoardComponent implements OnInit, OnDestroy {
  gameState$: Observable<StateModel>;
  gameOverSounded = false;

  constructor(private gameService: GameService) {
    this.gameState$ = this.gameService.gameState$.pipe(
      tap((state: StateModel) => (this.gameOverSounded = state.gameOver)),
      tap((state: StateModel) => this.playFx(state))
    );
  }

  startGame() {}

  ngOnInit() {}

  private playFx(state: StateModel) {
    const { audioPlayer, audioGameOver } = this.getAudio(state);

    if (!state.gameOver) {
      return audioPlayer.play();
    }

    return audioGameOver.play();
  }

  makeMove(row: number, col: number) {
    // if (!this.gameOverSounded) {
      this.gameService.makeMove(row, col);
    // }
  }

  resetGame() {
    this.gameService.resetGame();
  }

  ngOnDestroy(): void {
    // for (let sub of this.subs) {
    //   sub.unsubscribe;
    // }
  }

  // @todo use Angular's ResolverService to preload audio files
  // eg. https://stackoverflow.com/questions/58528417/how-to-preload-audio-files-in-angular-project
  private getAudio(state: StateModel) {
    const audioGameOver = new Audio('/assets/fx/win.ogg');
    const audioX = new Audio('/assets/fx/plop-x.ogg');
    const audioO = new Audio('/assets/fx/plop-y.ogg');
    const audioPlayer = state.currentPlayer === 'X' ? audioX : audioO;

    return { audioPlayer, audioGameOver };
  }
}
