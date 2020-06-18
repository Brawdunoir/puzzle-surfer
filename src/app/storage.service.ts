import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { VariableService } from './variable.service';
import { Tile } from './tile-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: StorageMap, private variable: VariableService) {}

  syncStorage = window.localStorage;

  // Sync storage
  gridDimensionStorageName = 'grid-dimension';
  difficultyStorageName = 'difficulty';
  initCompleteStorageName = 'init-ok';

  // Async storage
  themeStorageName = 'theme';
  colorStorageName = 'color';
  accessibilityStorageName = 'accessibility';
  currentScoreBaseStorageName = 'current-score';
  bestScoreBaseStorageName = 'best-score';
  viewStorageBaseName = 'view';
  gridStorageBaseName = 'grid';
  // Usefull because score change with dim and difficulty
  currentScoreStorageKey = 'key-current-score';
  bestScoreStorageKey = 'key-best-score';
  // Usefull to easy access to game (grid+view) saves
  // Because there are dim * difficulty grid/view saves
  pieceIDViewStorageKey = 'key-view';
  gridStorageKey = 'key-grid';

  init(): void {
    const initDone = this.getSync(this.initCompleteStorageName) === 'true';

    if (!initDone) {
      console.log('Local storage init');

      // Grid dimensions
      this.setSync(
        this.gridDimensionStorageName,
        this.variable.defaultGridSize.toString()
      );
      console.log('grid dimension stored.');

      // Difficulty
      this.setSync(this.difficultyStorageName, this.variable.defaultDifficulty);
      console.log('difficulty successully stored.');

      // Theme
      this.storage
        .set(this.themeStorageName, this.variable.defaultTheme)
        .subscribe(
          () => {
            console.log('theme successfully stored.');
          },
          () => {
            console.error('theme storage initialization failed.');
          }
      );

      this.storage
        .set(this.colorStorageName, this.variable.defaultColor)
        .subscribe(
          () => {
            console.log('color successfully stored.');
          },
          () => {
            console.error('color storage initialization failed.');
          }
        );

      // Accessibility mode
      this.storage
        .set(
          this.accessibilityStorageName,
          this.variable.defaultAccessibilityValue
        )
        .subscribe(
          () => {
            console.log('accessibility mode successfully stored.');
          },
          () => {
            console.error('accessibility mode storage initialization failed.');
          }
      );

      // Scores
      for (let dim = this.variable.minGridSize; dim <= this.variable.maxGridSize; dim++) {
        this.initScores(dim);
        this.initViewID(dim);
        this.initGrid(dim);
      }

      // Init ok
      window.localStorage.setItem(this.initCompleteStorageName, 'true');
      console.log('Initialization complete successfully stored.');
    }
  }

  getSync(key: string): string {
    return this.syncStorage.getItem(key);
  }

  setSync(key: string, value: string): void {
    this.syncStorage.setItem(key, value);
  }

  initScores(dim: number): void {
    this.storage.set(this.getCurrentScoreKey(true, dim), 0).subscribe();
    this.storage.set(this.getBestScoreKey(true, dim), 0).subscribe();
    this.storage.set(this.getCurrentScoreKey(false, dim), 0).subscribe();
    this.storage.set(this.getBestScoreKey(false, dim), 0).subscribe();
  }

  initViewID(dim: number): void {
    const data: number[] = [-1, -1, -1];
    this.setSync(this.getPieceIDViewStorageKey(true, dim), JSON.stringify(data));
    this.setSync(this.getPieceIDViewStorageKey(false, dim), JSON.stringify(data));
  }

  initGrid(dim: number): void {
    // tslint:disable-next-line: prefer-const
    let tiles: Tile[] = [];
    // tslint:disable-next-line: prefer-const
    let grid: boolean[] = [];
    for (let i = 0; i < dim * dim; i++) {
      tiles.push({ color: '', filled: this.variable.tileHalf });
      // Because during init there is not piece in the grid
      grid.push(false);
    }
    this.storage.set(this.getGridStorageKey(true, dim), { Tiles: tiles, Grid: grid }).subscribe();
    this.storage
      .set(this.getGridStorageKey(false, dim), { Tiles: tiles, Grid: grid })
      .subscribe();
  }

  /**  Get the storage current score ID thanks to difficulty and dimension */
  getCurrentScoreKey(isHard: boolean, dim: number): string {
    const dimension: string = '-' + dim;
    let difficulty: string;
    isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.currentScoreBaseStorageName + difficulty + dimension;
  }

  /**  Get the storage best score ID thanks to difficulty and dimension */
  getBestScoreKey(isHard: boolean, dim: number): string {
    const dimension: string = '-' + dim;
    let difficulty: string;
    isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.bestScoreBaseStorageName + difficulty + dimension;
  }

  getPieceIDViewStorageKey(isHard: boolean, dim: number): string {
    const dimension: string = '-' + dim;
    let difficulty: string;
    isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.pieceIDViewStorageKey + difficulty + dimension;
  }

  getGridStorageKey(isHard: boolean, dim: number): string {
    const dimension: string = '-' + dim;
    let difficulty: string;
    isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.gridStorageBaseName + difficulty + dimension;
  }
}
