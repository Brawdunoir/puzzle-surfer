import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ScoreComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot([
       { path: '', component: AppComponent },
       { path: 'game', component: GameComponent},
     ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
