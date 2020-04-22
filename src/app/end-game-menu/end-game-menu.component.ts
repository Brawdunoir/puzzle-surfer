import { Component, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-end-game-menu',
  templateUrl: './end-game-menu.component.html',
  styleUrls: ['./end-game-menu.component.scss'],
})
export class EndGameMenuComponent {
  @Input() message: string;

  constructor(private gameService: GameService) {}

  restart() {
    this.gameService.triggerRestart();
  }
}
