import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { ScoreService } from './score.service';
import { BehaviorSubject } from 'rxjs';
import { PieceService } from './piece.service';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentPiecesID: number[] = []; // ID de chaque pièce présente sur l'écran

  onGameEnd: BehaviorSubject<boolean> = new BehaviorSubject(false); // Permet de savoir quand le jeu est terminé
  onGameRestart: BehaviorSubject<boolean> = new BehaviorSubject(false); // Permet de savoir quand le jeu est terminé
  onEmptyPiece: BehaviorSubject<any> = new BehaviorSubject(null); // Permet de charger de nouvelles pièces.

  constructor(
    private basic: BasicService,
    private score: ScoreService,
    private pieceService: PieceService,
    private variable: VariableService
  ) {}

  async uponIndexReceived(
    indexArray: number[],
    idPiece: number,
    color: string
  ): Promise<void> {
    this.basic.updateGrid(indexArray, true, color);

    await this.variable.delay(this.variable.tileDeleteDelay);

    this.checkGridComplete();

    this.delPiecesID(idPiece);

    // Il n'y a plus de pièces, on en reconstruit
    if (this.currentPiecesID.length === 0) {
      this.onEmptyPiece.next(null);
    }

    this.isEnd();
  }

  checkGridComplete(): void {
    const dim = this.basic.dimensions;
    let combo = 0;

    // On vérifie si c'est complet
    for (let i = 0; i < dim; i++) {
      let col = true;
      let row = true;

      for (let j = 0; j < dim; j++) {
        // Lignes
        if (!this.basic.grid[i * dim + j]) {
          row = false;
        }

        // Colonnes
        if (!this.basic.grid[i + j * dim]) {
          col = false;
        }
      }

      // On retire si c'est toujours vrai
      if (row) {
        for (let j = 0; j < dim; j++) {
          this.basic.updateGrid([i * dim + j], false);
        }
        combo++;
      }

      if (col) {
        for (let j = 0; j < dim; j++) {
          this.basic.updateGrid([i + j * dim], false);
        }
        combo++;
      }
    }

    if (combo > 0) {
      this.score.add(this.score.calculate(dim, combo));
    }
  }

  addPiecesID(id: number) {
    this.currentPiecesID.push(id);
  }

  delPiecesID(id: number) {
    const index = this.currentPiecesID.indexOf(id, 0);
    if (index > -1) {
      this.currentPiecesID.splice(index, 1);
    }
  }

  isEnd(): void {
    for (const id of this.currentPiecesID) {
      const positions = this.pieceService.formes[id].positions;

      for (let i = 0; i < this.basic.grid.length; i++) {
        let validPosition = true;

        for (const position of positions) {
          if (
            this.basic.grid[
              i + position.x + this.basic.dimensions * position.y
            ] ||
            position.y * this.basic.dimensions + i >= this.basic.grid.length ||
            i -
              Math.trunc(i / this.basic.dimensions) * this.basic.dimensions +
              position.x >=
              this.basic.dimensions
          ) {
            validPosition = false;
          }
        }

        if (validPosition) {
          return;
        }
      }
    }

    this.onGameEnd.next(true);
  }

  restart(): void {
    this.onGameRestart.next(true);

    this.basic.restart();
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.onEmptyPiece.next(null);
  }
}
