import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { ScoreService } from './score.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { PieceService } from './piece.service';
import { VariableService } from './variable.service';
import { IndexService } from './index.service';
import { StorageService } from './storage.service';
import { SettingsService } from './settings.service';

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
    private settings: SettingsService,
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

    if (!this.isHard()) {
      this.reloadPiece.next(idView);
    } else {
      // There are not more pieces, reload new ones
      if (this.currentPiecesID.length === 0) {
        this.reloadPiece.next(-1);
      }
    }
    // Check if the user has completed a row/column
    this.checkComplete();
    // Check if the user has lost
    this.isEnd();
  }

  initialization(): void {
    this.basic.init();
    this.pieceService.init();
    this.settings.setTheme(this.settings.getTheme());
    this.settings.setAccessibility(this.settings.getAccessibility());
  }

  checkComplete(): void {
    const dim = this.basic.dimensions;
    const grid = this.basic.grid;
    const rows = [];
    const columns = [];
    let combo = 0;

    // Check si une ligne/complète est finie
    for (let i = 0; i < grid.length; i++) {
      if (!grid[i]) {
        rows[Math.trunc(i / dim)] = true;
        columns[i % dim] = true;
      }
    }
    // Enlève les lignes/colonnes complètes
    for (let i = 0; i < dim; i++) {
      if (!rows[i]) {
        this.basic.updateGridFromIndex('row', i, false);
        combo++;
      }
      if (!columns[i]) {
        this.basic.updateGridFromIndex('column', i, false);
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
        const forme = this.pieceService.formes[id];
        const indexArray = this.index.get(i, forme.jumps);

        if (this.index.isSuitable(indexArray, i, forme.dimensions.x)) {
          return;
        }
      }
    }
    this.end.next();
  }

  triggerRestart(): void {
    // Trigger restart in basic Service
    this.basic.restart();
    // Trigger restart in components
    // ie in GameComponent, ScoreComponent
    this.restart.next();
    // Remove existing pieces and reload new
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.reloadPiece.next(-1);
  }

  triggerChangeDimensions() {
    // Reload dimensions in basic and change the jumps of the pieces
    this.basic.init();
    this.pieceService.changeGridDimensions();
    // Trigger restart to reset score
    this.restart.next();
    // Remove existing pieces and reload new
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.reloadPiece.next(-1);
  }

  isHard(): boolean {
    return this.settings.getDifficulty();
  }
}
