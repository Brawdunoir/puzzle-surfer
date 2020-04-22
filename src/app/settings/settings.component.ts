import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
import { StorageService } from '../storage.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // Slider
  min = 8;
  max = 30;
  value = this.basic.getDimensions();
  color = 'primary';
  // Themes
  nbStyle = 4;
  nbColor = 3;
  currentStyle = 'amoled';
  currentColor = 'sepia';

  // tslint:disable-next-line: max-line-length
  constructor(private variables: VariableService, private storage: StorageService, private basic: BasicService, private gameService: GameService) {}

  ngOnInit(): void {}

  changeGridDimension(event: any) {
    this.storage.store('dimensions', event.value);
    this.gameService.triggerRestart();
  }

  setFocus(theme: string, value: string) {
    const style = {
      'background-color': value === this.currentStyle ? 'black' : 'white',
    };
    const color = {
      'background-color': value === this.currentColor ? 'black' : 'white',
    };
    return theme === 'color' ? color : style;
  }

  changeTheme(theme: string, value: string): void {
    if (theme === 'color') {
      this.currentColor = value;
    } else {
      this.currentStyle = value;
    }
  }
}
