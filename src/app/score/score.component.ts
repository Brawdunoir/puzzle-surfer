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
  bestScore = 0; // TODO Changer pour enregistrer le score dans de la data
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
    });

    this.myRestart = this.gameService.restart.subscribe(() => {
      this.restart();
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
