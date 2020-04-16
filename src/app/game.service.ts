import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { ScoreService } from './score.service';
import { BehaviorSubject } from 'rxjs';
import { PieceService } from './piece.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentPiecesID: number[] = []; // ID de chaque pièce présente sur l'écran

  gameEnd: BehaviorSubject<boolean> = new BehaviorSubject(false); // Permet de savoir quand le jeu est terminé
  dropPiece: BehaviorSubject<any> = new BehaviorSubject(null); // Permet de charger de nouvelles pièces.

  constructor(private basic: BasicService, private scoreService: ScoreService, private pieceService: PieceService) { }


  uponIndexReceived(index: number[], idPiece: number, color: string) {
    this.basic.updateGrid(index, true, color);
    this.scoreService.addScore(index.length);

    this.checkGridComplete();

    this.delPiecesID(idPiece);

    // Il n'y a plus de pièces, on en reconstruit
    if (this.currentPiecesID.length === 0) {
      this.dropPiece.next(null);
    }

    this.isEnd();
  }

  checkGridComplete() {
    let col: boolean;
    let lig: boolean;
    const dim = this.basic.dimensions;
    // On vérifie si c'est complet
    for (let i = 0; i < dim; i++) {
      lig = true;
      col = true;
      for (let j = 0; j < dim; j++) {
        // Lignes
        if (!this.basic.grid[i * dim + j]) {
          lig = false;
        }
        // Colonnes
        if (!this.basic.grid[i + j * dim]) {
          col = false;
        }
      }
      // On retire si c'est toujours vrai
      // TODO Optimiser ceci (updateGrid est déjà une boucle)
      if (lig) {
        for (let j = 0; j < dim; j++) {
          this.basic.updateGrid([i * dim + j], false);
        }
        this.scoreService.addScore(dim);
      }
      if (col) {
        for (let j = 0; j < dim; j++) {
          this.basic.updateGrid([i + j * dim], false);
        }
        this.scoreService.addScore(dim);
      }
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
    let end = true;
    // On parcourt les pièces
    for (const id of this.currentPiecesID) {
      // On récupère les jumps de la pièce
      const jumps = this.pieceService.formes[id].jumps;
      // On parcourt toute la grille
      for (let i = 0; i < this.basic.grid.length; i++) {
        let positionPossible = true;
        jumps.forEach(jump => {
          if (this.basic.grid[i + jump] || i + jump > this.basic.grid.length) {
            positionPossible = false;
          }
        });
        if (positionPossible) {
          end = false;
          break;
        }
      }
    }

    this.gameEnd.next(end);
  }

  restart() {
    this.basic.init();
    this.currentPiecesID.slice(0, this.currentPiecesID.length);
    this.dropPiece.next(null);
  }
}