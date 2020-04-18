import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  bestScore = 0; // TODO Changer pour enregistrer le score dans de la data
  currentScore = 0;

  constructor(
    private scoreService: ScoreService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.scoreService.addScoreEvent.subscribe((value) => {
      this.currentScore += value;
      this.bestScore += value;
    });

    this.gameService.onGameRestart.subscribe(() => {
      this.restart();
    });
  }

  restart(): void {
    if (this.currentScore > this.bestScore) {
      this.bestScore = this.currentScore;
    }
    this.currentScore = 0;
  }
}
