import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  bestScore;
  currentScore;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.currentScore = this.scoreService.score;
    this.bestScore = this.scoreService.score;
  }

}
