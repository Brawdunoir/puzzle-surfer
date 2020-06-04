import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ScoreService } from '../score.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit, OnDestroy {
  currentScore = 0;
  bestScore = 0;

  currentSub: Subscription;
  bestSub: Subscription;

  @Output() menuState = new EventEmitter<boolean>();

  constructor(
    private scoreService: ScoreService,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {
    // ? Update current score
    this.currentSub = this.storage
      .watch(this.scoreService.currentScoreStorageKey)
      .subscribe(
        (current: number) => {
          if (current !== undefined) {
            this.currentScore = current;
          } else {
            this.currentScore = 0;
          }
        },
        () => {
          console.warn('Can not access current score in score component');
        }
      );

    // ? Update best score
    this.bestSub = this.storage
      .watch(this.scoreService.bestScoreStorageKey)
      .subscribe(
        (best: number) => {
          if (best !== undefined) {
            this.bestScore = best;
          } else {
            this.bestScore = 0;
          }
        },
        () => {
          console.warn('Can not access best score in score component');
        }
      );
  }

  ngOnDestroy(): void {
    this.currentSub.unsubscribe();
    this.bestSub.unsubscribe();
  }

  restart(): void {
    this.scoreService.restart();
  }

  /** Button to Menu access (Yes it's on the scorebar !) */
  showMenu(): void {
    this.menuState.emit(true);
  }
}
