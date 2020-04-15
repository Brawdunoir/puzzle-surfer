import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  score: number = 0;

  addScore(number: number) {
    this.score += number;
  }

  constructor() { }
}
