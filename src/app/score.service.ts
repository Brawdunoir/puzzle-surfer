import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  update: Subject<number> = new Subject(); // Use to update score in observers

  constructor(private storage: StorageService, private grid: GridService) {}

  /** Add/update the score to the interface */
  add(score: number): void {
    this.update.next(score);
  }

  /** Calculate the score depending on the combo */
  calculate(dim: number, combo: number): number {
    if (combo < 1) {
      return 0;
    }

    // A little polynomial function
    return Math.round(0.4 * Math.pow(combo, 2) + 1 * combo) * dim * 100;
  }

  /** Update the best score to the local storage */
  updateBest(newBest: number): void {
    // Verify this new score is better than previous
    const dim = this.grid.getDimensions();
    const bestScore = 'bestScore'.concat(dim.toString());
    if (
      !this.storage.get(bestScore) ||
      +this.storage.get(bestScore) < newBest
    ) {
      // Store it
      this.storage.store(bestScore, newBest.toString());
    }
  }

  /** Get the best score */
  getBest(): number {
    const dim = this.grid.getDimensions();
    const bestScore = 'bestScore'.concat(dim.toString());
    if (!this.storage.get(bestScore)) {
      return 0;
    }
    return +this.storage.get(bestScore);
  }
}
