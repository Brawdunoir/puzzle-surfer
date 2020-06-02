import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { FormeService } from './forme.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class PieceService {

  dim = this.grid.dimensions;

  currentPieceID: number;
  currentViewID: number;
  formesInGameID: number[] = [];

  formes = this.forme.formes;

  constructor(private grid: GridService, private forme: FormeService) {}

  /** Return a random piece ID */
  getRandomID(): number {
    const i = Math.floor(
      Math.random() * Math.floor(this.formesInGameID.length)
    );
    this.currentPieceID = this.formesInGameID[i];
    return this.currentPieceID;
  }

  /** Initialize forms depending on their and the grid dimensions
   * It'll add n times the form depending on its priority
   */
  init() {
    this.formesInGameID = [];
    for (let i = 0; i < this.formes.length; i++) {
      const forme = this.formes[i];
      const priority = forme.priority;
      if (
        forme.dimensions.x <= Math.round(this.dim / 3) &&
        forme.dimensions.y <= Math.round(this.dim / 3)
      ) {
        for (let k = 0; k < priority; k++) {
          this.formesInGameID.push(i);
        }
      }
    }
  }

  /** Change pieces array related with grid dimensions */
  changeGridDimensions() {
    this.dim = this.grid.dimensions;
    this.forme.updateJumps();
    this.formes = this.forme.formes;
    this.init();
  }
}
