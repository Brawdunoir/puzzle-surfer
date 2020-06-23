import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageService } from '../storage.service';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

  constructor(private variable: VariableService, private scoreService: ScoreService) { }

  min = this.variable.minGridSize;
  max = this.variable.maxGridSize;

  bestScoreEasy: number[] = [];
  bestScoreHard: number[] = [];

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    for (let i = 0; i <= this.max - this.min; i++) {
      this.bestScoreEasy[i] = this.scoreService.bestScoreEasy[i];
      this.bestScoreHard[i] = this.scoreService.bestScoreHard[i];
    }
  }
}
