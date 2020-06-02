import { Injectable } from '@angular/core';
import { GridService } from './grid.service';
import { ScoreService } from './score.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { PieceService } from './piece.service';
import { VariableService } from './variable.service';
import { IndexService } from './index.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  currentPiecesID: number[] = []; // Pieces ID left on the bottom

  end: Subject<boolean> = new Subject(); // Trigger end in observers
  restart: Subject<boolean> = new Subject(); // Trigger restart in observers

  /* Reload new pieces on the bottom. -1 reload all. */
  reloadPiece: BehaviorSubject<number> = new BehaviorSubject(-1);

  constructor(
    private grid: GridService,
    private score: ScoreService,
    private pieceService: PieceService,
    private variable: VariableService,
    private index: IndexService,
    private settings: SettingsService,
  ) {}

  /** Trigger each time a piece is dropped and accepted in the grid
   * @param indexArray index occupied by the piece
   * @param idPiece piece ID
   * @param idView view ID (bottom with pieces left)
   * @param color color of the dropped piece
   */
  async uponIndexReceived(
    indexArray: number[],
    idPiece: number,
    idView: number,
    color: string
  ): Promise<void> {
    this.grid.updateFromIndex(indexArray, true, color);

    await this.variable.delay(this.variable.tileDeleteDelay);

    this.delPiecesID(idPiece);

    if (!this.isHard()) {
      this.reloadPiece.next(idView);
    } else {
      // There are no pieces left, reload new ones
      if (this.currentPiecesID.length === 0) {
        this.reloadPiece.next(-1);
      }
    }
    // Check if the user has completed a row/column
    this.checkComplete();
    // Check if the user has lost
    this.checkEnd();
  }

  /** Initialize a game */
  initialization(): void {
    this.grid.init();
    this.pieceService.init();
    this.settings.setTheme(this.settings.getTheme());
    this.settings.setAccessibility(this.settings.getAccessibility());
  }

  /** Check if a row/column is complete and update grid */
  checkComplete(): void {
    const dim = this.grid.dimensions;
    const grid = this.grid.grid;
    const rows = [];
    const columns = [];
    let combo = 0;

    // Check if a row/column if complete
    for (let i = 0; i < grid.length; i++) {
      if (!grid[i]) {
        rows[Math.trunc(i / dim)] = true;
        columns[i % dim] = true;
      }
    }
    // Update grid in consequence
    for (let i = 0; i < dim; i++) {
      if (!rows[i]) {
        this.grid.updateFromDim('row', i, false);
        combo++;
      }
      if (!columns[i]) {
        this.grid.updateFromDim('column', i, false);
        combo++;
      }
    }
    if (combo > 0) {
      this.score.add(this.score.calculate(dim, combo));
    }
  }

  /** Add a piece ID in currentPiecesID */
  private addPiecesID(id: number): void {
    this.currentPiecesID.push(id);
  }

  /** Delete a piece ID in currentPiecesID */
  delPiecesID(id: number): void {
    const index = this.currentPiecesID.indexOf(id, 0);
    if (index > -1) {
      this.currentPiecesID.splice(index, 1);
    }
  }

  /** Add a new piece in the view (pieces left on the bottom)
   * It'll get a new random piece ID while this piece ID is already in the view
   * with a cap of max itérations maxIter
   */
  addPiece(viewID: number): void {
    const maxIter = 3;
    let iter = 0;
    let newID: number;

    do {
      newID = this.pieceService.getRandomID();
      iter++;
    } while (iter < maxIter && this.currentPiecesID.includes(newID));

    this.addPiecesID(newID);
    this.pieceService.currentViewID = viewID;
  }

  /** Check if it's game over and throws end if it is */
  checkEnd(): void {
    for (const id of this.currentPiecesID) {
      for (let i = 0; i < this.grid.grid.length; i++) {
        const forme = this.pieceService.formes[id];
        const indexArray = this.index.get(i, forme.jumps);

        if (this.index.isSuitable(indexArray, i, forme.dimensions.x)) {
          return;
        }
      }
    }
    this.end.next();
  }

  /** Trigger restart */
  triggerRestart(): void {
    // Trigger restart in basic Service
    this.grid.restart();
    // Trigger restart in components
    // ie in GameComponent, ScoreComponent
    this.restart.next();
    // Remove existing pieces and reload new
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.reloadPiece.next(-1);
  }

  /** Trigger a change in dimension */
  triggerChangeDimensions(): void {
    // Reload dimensions in basic and change the jumps of the pieces
    this.grid.init();
    this.pieceService.changeGridDimensions();
    // Trigger restart to reset score
    this.restart.next();
    // Remove existing pieces and reload new
    this.currentPiecesID.splice(0, this.currentPiecesID.length);
    this.reloadPiece.next(-1);
  }

  /** Return the difficulty */
  isHard(): boolean {
    return this.settings.isHard();
  }
}
