import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ScoreService } from '../score.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  bestScore = this.scoreService.getBest();
  currentScore = 0;

  update: any;
  myRestart: any;

  @Output() visibility = new EventEmitter<boolean>();

  constructor(
    private scoreService: ScoreService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.update = this.scoreService.update.subscribe((value) => {
      this.currentScore += value;

      if (this.currentScore > this.bestScore) {
        this.bestScore += value;
        this.scoreService.updateBest(this.currentScore);
      }
    });

    this.myRestart = this.gameService.restart.subscribe(() => {
      this.bestScore = this.scoreService.getBest();
      this.currentScore = 0;
    });
  }

  ngOnDestroy(): void {
    this.update.unsubscribe();
    this.myRestart.unsubscribe();
  }

  restart(): void {
    if (this.currentScore > this.bestScore) {
      this.bestScore = this.currentScore;
    }
    this.currentScore = 0;
  }

  showMenu(): void {
    this.visibility.emit(true);
  }
}
