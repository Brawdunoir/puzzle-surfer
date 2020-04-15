import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { ScoreService } from './score.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentPiecesID: number[] = []; // ID de chaque pièce présente sur l'écran

  dropPiece: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private basic: BasicService, private scoreService: ScoreService) { }


  uponIndexReceived(index: number[], idPiece: number) {
    this.basic.updateGrid(index, true);

    this.checkGridComplete();

    this.delPiecesID(idPiece);
    console.log(this.currentPiecesID.length);

    if (this.currentPiecesID.length == 0) {
      console.log("ici");
      this.dropPiece.next(null);
    }
    
    this.isEnd();
  }

  checkGridComplete() {
    let col: boolean;
    let lig: boolean;
    let dim = this.basic.dimensions;
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
    console.log(this.currentPiecesID);
    console.log(id);
    const index = this.currentPiecesID.indexOf(id, 0);
    if (index > -1) {
      this.currentPiecesID.splice(index, 1);
    }
  }

  isEnd(): boolean {
    return false;
  }
}
