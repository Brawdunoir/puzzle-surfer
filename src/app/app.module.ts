import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewContainerRef } from '@angular/core'


import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { SingleBlocComponent } from './single-bloc/single-bloc.component';
import { TetrisBlocComponent } from './tetris-bloc/tetris-bloc.component';
import { PieceDirective1, PieceDirective2, PieceDirective3 } from './piece.directive';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ScoreComponent,
    GameComponent,
    HomeComponent,
    SingleBlocComponent,
    TetrisBlocComponent,
    PieceDirective1,
    PieceDirective2,
    PieceDirective3,
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
     BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [ TetrisBlocComponent, SingleBlocComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
