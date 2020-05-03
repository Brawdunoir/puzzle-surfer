import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { SettingsService } from './settings.service';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  update: Subject<number> = new Subject();

  constructor(private storage: StorageService, private settings: SettingsService, private basic: BasicService) {}

  add(score: number) {
    this.update.next(score);
  }

  calculate(dim: number, combo: number): number {
    if (combo < 1) {
      return 0;
    }

    return Math.round(0.4 * Math.pow(combo, 2) + 1 * combo) * dim;
  }

  updateBest(newBest: number): void {
    // Verify this new score is better than previous
    const dim = this.basic.getDimensions();
    const bestScore = 'bestScore'.concat(dim.toString());
    if (
      !this.storage.get(bestScore) ||
      +this.storage.get(bestScore) < newBest
    ) {
      // Store it
      this.storage.store(bestScore, newBest.toString());
    }
  }

  getBest(): number {
    const dim = this.basic.getDimensions();
    const bestScore = 'bestScore'.concat(dim.toString());
    if (!this.storage.get(bestScore)) {
      return 0;
    }
    return +this.storage.get(bestScore);
  }
}
