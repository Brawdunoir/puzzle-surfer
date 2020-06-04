import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  currentScoreStorageKey: string;
  bestScoreStorageKey: string;

  gridDimension = this.variables.defaultGridSize;
  isHard = this.variables.defaultDifficulty === 'hard';

  currentScore: number;
  bestScore: number;

  constructor(
    private storageService: StorageService,
    private storage: StorageMap,
    private variables: VariableService
  ) {}

  init(): void {
    this.gridDimension = +this.storageService.getSync(this.storageService.gridDimensionStorageName);
    this.isHard = this.storageService.getSync(this.storageService.difficultyStorageName) === 'hard';

    this.updateKey();

    this.storage.get(this.currentScoreStorageKey).subscribe((current: number) => {
      this.currentScore = current;
    });
    this.storage.get(this.bestScoreStorageKey).subscribe((best: number) => {
      this.bestScore = best;
    });
  }

  private updateKey() {
    // ? Local update
    this.currentScoreStorageKey = this.storageService.getCurrentScoreKey(this.isHard, this.gridDimension);
    this.bestScoreStorageKey = this.storageService.getBestScoreKey(this.isHard, this.gridDimension);
  }

  /** Add delta to the current score */
  add(delta: number): void {
    const oldCurrent = this.currentScore;
    const newCurrent = oldCurrent + delta;
    this.storage.set(this.currentScoreStorageKey, newCurrent).subscribe(() => {
      console.log(
        'Updated current score from ' + oldCurrent + ' to ' + newCurrent
      );
      this.updateBest(newCurrent);
    });
    this.currentScore = newCurrent;
  }

  /** Update the best score to the local storage */
  private updateBest(newCurrent: number): void {
    if (newCurrent > this.bestScore) {
      this.storage.set(this.bestScoreStorageKey, newCurrent).subscribe(() => {
        console.log(
          'New best score (' +
            newCurrent +
            ') saved for ' +
            this.bestScoreStorageKey
        );
        this.bestScore = newCurrent;
      });
    }
  }

  /** Calculate the score depending on the combo */
  calculate(combo: number): number {
    if (combo < 1) {
      return 0;
    }

    // A little polynomial function
    return (
      Math.round(0.4 * Math.pow(combo, 2) + 1 * combo) *
      this.gridDimension *
      100
    );
  }

  restart(): void {
    this.storage.set(this.currentScoreStorageKey, 0).subscribe(
      () => {
        console.log('Current score has been reinitialized');
      },
      () => {
        console.log('Current score can not be reinitialized');
      }
    );
  }

  /** Get current score of the game */
  private getCurrent(): number {
    return +this.storageService.getSync(this.currentScoreStorageKey);
  }
}
