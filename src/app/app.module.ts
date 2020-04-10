import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ScoreComponent,
    GameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
     RouterModule.forRoot([
       { path: '', component: HomeComponent },
       { path: 'game', component: GameComponent },
     ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
