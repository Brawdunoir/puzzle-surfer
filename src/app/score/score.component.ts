import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScoreService } from '../score.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  bestScore = 0; // TODO Changer pour enregistrer le score dans de la data
  currentScore = 0;

  constructor(
    private scoreService: ScoreService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.scoreService.update.subscribe((value) => {
      this.currentScore += value;
    });

    this.gameService.onGameRestart.subscribe(() => {
      this.restart();
    });
  }

  ngOnDestroy(): void {
    this.scoreService.update.unsubscribe();
    this.gameService.onGameRestart.unsubscribe();
  }

  restart(): void {
    if (this.currentScore > this.bestScore) {
      this.bestScore = this.currentScore;
    }
    this.currentScore = 0;
  }
}
