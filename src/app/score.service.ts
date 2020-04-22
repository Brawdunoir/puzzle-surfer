import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  update: Subject<number> = new Subject();

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
