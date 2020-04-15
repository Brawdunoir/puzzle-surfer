import { Injectable, OnInit } from '@angular/core';
import { SingleBlocComponent } from './single-bloc/single-bloc.component';
import { GameComponent } from './game/game.component';
import { PieceItem } from './piece-item';
import { TetrisBlocComponent } from './tetris-bloc/tetris-bloc.component';
import { ArgumentType } from '@angular/compiler/src/core';
import { MultiService } from './multi.service';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class PieceService implements OnInit {

  constructor(private multiService: MultiService, private basic: BasicService) { }
  
  ngOnInit(): void {
    // this.basic.onInit();
  }
  

  getPieces() {
    let dim = this.basic.dimensions;
    return [
      // new PieceItem(SingleBlocComponent, []),
      new PieceItem(TetrisBlocComponent, [1, dim, dim + 1, dim + 2]),
  ]}

}
