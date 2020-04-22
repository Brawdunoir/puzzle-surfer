import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-end-game-menu',
  templateUrl: './end-game-menu.component.html',
  styleUrls: ['./end-game-menu.component.scss'],
})
export class EndGameMenuComponent {
  @Input() message: string;
  @Output() menuState = new EventEmitter<boolean>();
  @Output() settingsState = new EventEmitter<boolean>();

  constructor(private game: GameService) {}

  restart() {
    this.game.triggerRestart();
  }

  hide(): void {
    this.menuState.emit(false);
  }

  showSettings(): void {
    this.settingsState.emit(true);
  }
}
