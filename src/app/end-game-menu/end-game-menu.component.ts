import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-end-game-menu',
  templateUrl: './end-game-menu.component.html',
  styleUrls: ['./end-game-menu.component.scss'],
})
export class EndGameMenuComponent {
  message = 'Vous avez perdu !';

  constructor(private gameService: GameService) {}

  restart() {
    this.gameService.restart();
  }
}
