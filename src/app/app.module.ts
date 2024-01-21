import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './board/board.component';
import { MaterialModule } from './mat-ui/mat-ui.module';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [AppComponent, GameBoardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MaterialModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
