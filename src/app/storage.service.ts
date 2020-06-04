import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { VariableService } from './variable.service';
import { ScoreService } from './score.service';

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
        this.storage.set(this.getCurrentScoreKey(true, dim), 0).subscribe();
        this.storage.set(this.getBestScoreKey(true, dim), 0).subscribe();
        this.storage.set(this.getCurrentScoreKey(false, dim), 0).subscribe();
        this.storage.set(this.getBestScoreKey(false, dim), 0).subscribe();
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
}
