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

  constructor(
    private storNames: StorageService,
    private storage: StorageMap,
    private variables: VariableService
  ) {}

  init(): void {
    // ? Grid dimension / Update key
    this.storage.watch(this.storNames.gridDimensionStorageName).subscribe(
      (dim: number) => {
        this.gridDimension = dim;
        this.updateKey();
      },
      () => {
        console.warn('Can not access grid dimensions in score service');
      }
    );

    // ? Difficulty / Update key
    this.storage.watch(this.storNames.difficultyStorageName).subscribe(
      (isHard: boolean) => {
        this.isHard = isHard;
        this.updateKey();
      },
      () => {
        console.warn('Can not access difficulty in score service');
      }
    );
  }

  private updateKey() {
    // ? Local update
    this.currentScoreStorageKey = this.getCurrentScoreKey();
    this.bestScoreStorageKey = this.getBestScoreKey();

    // ? Update to storage new current score key
    this.storage
      .set(this.storNames.currentScoreStorageKey, this.currentScoreStorageKey)
      .subscribe(
        () => {
          console.log('Successfully updated current score storage key');
        },
        () => {
          console.warn('Can not update current score storage key');
        }
      );

    // ? Update to storage new best score key
    this.storage
      .set(this.storNames.bestScoreStorageKey, this.bestScoreStorageKey)
      .subscribe(
        () => {
          console.log('Successfully updated best score storage key');
        },
        () => {
          console.warn('Can not update best score storage key');
        }
      );
  }

  /** Add delta to the current score */
  add(delta: number): void {
    const oldCurrent = this.getCurrent();
    const newCurrent = oldCurrent + delta;
    this.storage.set(this.currentScoreStorageKey, newCurrent).subscribe(() => {
      console.log(
        'Updated current score from ' + oldCurrent + ' to ' + newCurrent
      );
      this.updateBest(newCurrent);
    });
  }

  /** Update the best score to the local storage */
  private updateBest(newCurrent: number): void {
    let currentBest: number;
    this.storage.get(this.bestScoreStorageKey).subscribe((best: number) => {
      currentBest = best;
    });

    if (newCurrent > currentBest) {
      this.storage.set(this.bestScoreStorageKey, newCurrent).subscribe(() => {
        console.log(
          'New best score (' +
            newCurrent +
            ') saved for ' +
            this.bestScoreStorageKey
        );
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
    let current: number;
    this.storage.get(this.currentScoreStorageKey).subscribe((data: number) => {
      if (data != null) {
        current = data;
      } else {
        console.warn('Tried to get null current score from storage');
      }
    });

    return current;
  }

  /**  Get the storage current score ID thanks to difficulty and dimension */
  private getCurrentScoreKey(): string {
    const dimension: string = '-' + this.gridDimension.toString();
    let difficulty: string;
    this.isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.storNames.currentScoreBaseStorageName + difficulty + dimension;
  }

  /**  Get the storage best score ID thanks to difficulty and dimension */
  private getBestScoreKey(): string {
    const dimension: string = '-' + this.gridDimension.toString();
    let difficulty: string;
    this.isHard ? (difficulty = '-hard') : (difficulty = '-easy');
    return this.storNames.bestScoreBaseStorageName + difficulty + dimension;
  }
}
