import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../settings.service';
import { GameService } from '../game.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // Slider
  min = 8;
  max = 20;
  valueDimensions = this.settings.getGridDimensions();
  valueHard = this.settings.getDifficulty();
  color = 'primary';

  @Output() settingsState = new EventEmitter<boolean>();

  constructor(
    private settings: SettingsService,
    private game: GameService,
  ) {}

  ngOnInit(): void {}

  selectGridDimension(event: any) {
    this.settings.setGridDimensions(event.value);
    this.game.triggerChangeDimensions();
  }

  selectTheme(event: any): void {
    this.settings.setTheme(event.currentTarget.id);
  }

  selectAccessibility(event: any): void {
    this.settings.setAccessibility(event.currentTarget.id);
  }

  switchDifficulty() {
    this.settings.switchDifficulty();
    this.game.triggerRestart();
  }

  close(): void {
    this.settingsState.emit(false);
  }
}
