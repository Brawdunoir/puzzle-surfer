import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { ScoreService } from './score.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { PieceService } from './piece.service';
import { VariableService } from './variable.service';
import { IndexService } from './index.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentPiecesID: number[] = []; // ID de chaque pièce présente sur l'écran

  end: Subject<boolean> = new Subject(); // Permet de savoir quand le jeu est terminé
  restart: Subject<boolean> = new Subject(); // Permet de savoir quand le jeu est terminé
  /* Permet de charger de nouvelles pièces
    -1 permet de recharger toutes les pièces */
  reloadPiece: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(
    private basic: BasicService,
    private score: ScoreService,
    private pieceService: PieceService,
    private variable: VariableService,
    private index: IndexService,
    private storage: StorageService,
  ) {}

  async uponIndexReceived(
    indexArray: number[],
    idPiece: number,
    idView: number,
    color: string
  ): Promise<void> {
    this.basic.updateGrid(indexArray, true, color);

    await this.variable.delay(this.variable.tileDeleteDelay);

    this.delPiecesID(idPiece);

    if (this.isEasy()) {
      this.reloadPiece.next(idView);
    } else {
      // There are not more pieces, reload new ones
      if (this.currentPiecesID.length === 0) {
        this.reloadPiece.next(-1);
      }
    }
    // Check if the user has completed a row/column
    this.checkGridComplete();
    // Check if the user has lost
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

  addPiece(viewID: number): void {
    let newID: number;
    for (let iter = 0; iter < 5; iter++) {
      newID = this.pieceService.getRandomID();
      if (!this.currentPiecesID.includes(newID)) {
        break;
      }
    }
    this.addPiecesID(newID);
    this.pieceService.currentViewID = viewID;
  }

  isEnd(): void {
    for (const id of this.currentPiecesID) {
      for (let i = 0; i < this.basic.grid.length; i++) {
        const indexArray = this.index.getFromPiece(i, this.pieceService.formes[id].jumps);

        if (this.index.isSuitable(indexArray)) {
          return;
        }
      }
    }
    this.end.next();
  }

  triggerRestart(): void {
    // Trigger restart in components
    // ie in GameComponent, ScoreComponent
    this.restart.next();
    // Trigger restart in basic Service
    this.basic.restart();
    // Remove existing pieces and reload new
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.reloadPiece.next(-1);
  }

  isEasy(): boolean {
    if (!this.storage.get('difficulty') || this.storage.get('difficulty') === 'easy') {
      return true;
    } else {
      return false;
    }
  }
}
