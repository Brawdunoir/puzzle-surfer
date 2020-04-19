import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  update: BehaviorSubject<number> = new BehaviorSubject(0);

  add(score: number) {
    this.update.next(score);
  }

  calculate(dim: number, combo: number): number {
    if (combo < 1) {
      return 0;
    }

    return Math.round(0.4 * Math.pow(combo, 2) + 1 * combo) * dim;
  }

  constructor() {}
}
