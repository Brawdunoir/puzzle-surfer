import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatGridListModule } from '@angular/material/grid-list';


import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { ScoreComponent } from './score/score.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { SingleBlocComponent } from './single-bloc/single-bloc.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    ScoreComponent,
    GameComponent,
    HomeComponent,
    SingleBlocComponent,
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
  bootstrap: [AppComponent]
})
export class AppModule { }
