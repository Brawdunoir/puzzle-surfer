import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ScoreService } from '../score.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent implements OnInit {
  currentScore$: Observable<number>;
  bestScore$: Observable<number>;

  @Output() menuState = new EventEmitter<boolean>();

  constructor(
    private scoreService: ScoreService,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {
    // ? Update current score
    this.currentScore$ = this.storage.watch(
      this.scoreService.currentScoreStorageKey,
      { type: 'number' }
    );

    // ? Update best score
    this.bestScore$ = this.storage.watch(this.scoreService.bestScoreStorageKey,
      { type: 'number' });
  }

  /** Button to Menu access (Yes it's on the scorebar !) */
  showMenu(): void {
    this.menuState.emit(true);
  }
}
