import { Injectable, ViewChild } from '@angular/core';
import { GridService } from './grid.service';
import { ScoreService } from './score.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { PieceService } from './piece.service';
import { VariableService } from './variable.service';
import { IndexService } from './index.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  // ! Variables
  isHard: boolean;
  gridDimension: number;

  currentPiecesID: number[] = []; // Pieces ID left on the bottom

  end: Subject<boolean> = new Subject(); // Trigger end in observers
  restart: Subject<boolean> = new Subject(); // Trigger restart in observers

  /* Reload new pieces on the bottom. -1 reload all. */
  reloadPiece: Subject<number> = new Subject();

  constructor(
    private grid: GridService,
    private score: ScoreService,
    private pieceService: PieceService,
    private variable: VariableService,
    private index: IndexService,
    private storage: StorageMap,
    private storNames: StorageService
  ) {}

  /** Initialize a game */
  initialization(): void {
    this.initVariables();
    this.grid.init();
    this.pieceService.init();
    this.score.init();
  }

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

    this.delPiecesID(idView);
    // Reload pieces in the view if needed
    // ? every single time in easy mode, and
    // ? when none are left in hard mode
    this.checkPieces(idView);
    // Check if the user has completed a row/column
    this.checkComplete();
    // Check if the user has lost
    this.checkEnd();
  }

  /** Check if a row/column is complete and update grid */
  private checkComplete(): void {
    const grid = this.grid.grid;
    const rows = [];
    const columns = [];
    let combo = 0;

    // Check if a row/column if complete
    for (let i = 0; i < grid.length; i++) {
      if (!grid[i]) {
        rows[Math.trunc(i / this.gridDimension)] = true;
        columns[i % this.gridDimension] = true;
      }
    }
    // Update grid in consequence
    for (let i = 0; i < this.gridDimension; i++) {
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
      this.score.add(this.score.calculate(combo));
    }
  }

  private checkPieces(idView: number): void {
    if (!this.isHard) {
      this.reloadPiece.next(idView);
    } else {
      if (this.currentPiecesID.every(el => el === null)) {
        this.reloadPiece.next(-1);
      }
    }
  }

  /** Add a piece ID in currentPiecesID */
  private addPiecesID(idPiece: number, idView: number): void {
    this.currentPiecesID[idView] = idPiece;
    console.log('Piece ID was added, new array: ' + this.currentPiecesID);
    const data = JSON.stringify(this.currentPiecesID);
    this.storNames.setSync(
      this.storNames.getPieceIDViewStorageKey(this.isHard, this.gridDimension),
      data
    );
  }

  /** Delete a piece ID in currentPiecesID */
  private delPiecesID(idView: number): void {
    this.currentPiecesID[idView] = null;
    console.log('Piece ID was deleted, new array: ' + this.currentPiecesID);
    const data = JSON.stringify(this.currentPiecesID);
    this.storNames.setSync(
      this.storNames.getPieceIDViewStorageKey(this.isHard, this.gridDimension),
      data
    );
  }

  /** Add a new piece in the logic game */
  addPiece(idView: number): void {
    const newID = this.getRandomPieceID();
    // ? Add this new ID to the logic game
    this.addPiecesID(newID, idView);
    // ! So that the future real piece can know it's info
    this.pieceService.currentViewID = idView;
  }

  /** Get a new random piece ID while this piece ID is already in the view
   *  with a cap of max itérations maxIter
   */
  private getRandomPieceID(): number {
    const maxIter = 3;
    let iter = 0;
    let newID: number;

    do {
      newID = this.pieceService.getRandomID();
      iter++;
    } while (iter < maxIter && this.currentPiecesID.includes(newID));

    return newID;
  }

  /** Check if it's game over and throws end if it is */
  private checkEnd(): void {
    for (const id of this.currentPiecesID) {
      // ? Because we set piece id to null in hard mode
      if (id != null) {
        for (let i = 0; i < this.grid.grid.length; i++) {
          const forme = this.pieceService.formes[id];
          const indexArray = this.index.get(i, forme.jumps);

          if (this.index.isSuitable(indexArray, i, forme.dimensions.x)) {
            return;
          }
        }
        this.end.next();
      }
    }
  }

  /** Trigger restart */
  triggerRestart(): void {
    // Trigger restart in basic Service
    this.grid.restart();
    // Reset current score
    this.score.reset();
    // Trigger restart in components
    // ie in GameComponent
    this.restart.next();
    // Remove existing pieces and reload new
    this.currentPiecesID.every(el => el = null);
    this.reloadPiece.next(-1);
  }

  /** Restore previous state of piece ID in the View (bottom)
   *  Called in the Game Component
   * @param idView represents the view currently initializing in Game Component
   * @returns if Game Component should create or not the piece from Common-Bloc Component
   */
  restores(idView: number): boolean {
    const JSONStoredData = this.storNames.getSync(this.storNames.getPieceIDViewStorageKey(this.isHard, this.gridDimension));
    const savedPieceID = JSON.parse(JSONStoredData);
    let ID = savedPieceID[idView];
    // The value is -1 when we start a new game
    if (ID === -1) {
      ID = this.getRandomPieceID();
      this.currentPiecesID[idView] = ID;
      console.log('New game is started, piece ID ' + ID +
        ' has been added');
      }
      // Maybe it can be null
      else if (ID == null) {
        if (this.isHard && savedPieceID.length !== 0) {
          return false; // so we won't build the component
        }
        else {
          ID = this.getRandomPieceID();
          this.currentPiecesID[idView] = ID;
          console.log('Oh, we got here ? Strange, but piece ID ' + ID +
            ' has been added');
      }
    }
    else {
      console.log('Will restore piece ID ' + ID +
      ' from array ' + savedPieceID);
    }
    this.currentPiecesID[idView] = ID;
    this.pieceService.currentPieceID = ID;
    this.pieceService.currentViewID = idView;
    return true; // so we will build the component
  }

  /** Get common variables */
  private initVariables(): void {
    this.gridDimension = +this.storNames.getSync(
      this.storNames.gridDimensionStorageName
    );
    this.isHard =
      this.storNames.getSync(this.storNames.difficultyStorageName) === 'hard';
  }
}
