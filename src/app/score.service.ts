import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  addScoreEvent: BehaviorSubject<number> = new BehaviorSubject(0);

  addScore(score: number) {
    this.addScoreEvent.next(score);
  }

  constructor() { }
}
