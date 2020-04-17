import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';


import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { PieceDirective1, PieceDirective2, PieceDirective3 } from './piece.directive';
import { CommonBlocComponent } from './common-bloc/common-bloc.component';
import { EndGameMenuComponent } from './end-game-menu/end-game-menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ScoreComponent,
    GameComponent,
    HomeComponent,
    PieceDirective1,
    PieceDirective2,
    PieceDirective3,
    CommonBlocComponent,
    EndGameMenuComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    DragDropModule,
    MatGridListModule,
     RouterModule.forRoot([
       { path: '', component: HomeComponent },
       { path: 'game', component: GameComponent },
     ]),
     BrowserAnimationsModule,
     ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  // entryComponents: [ TetrisBlocComponent, SingleBlocComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
