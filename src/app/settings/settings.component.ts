import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingsService } from '../settings.service';
import { VariableService } from '../variable.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // Dimension slider
  min = this.variable.minGridSize;
  max = this.variable.maxGridSize;
  valueDimensions: number;
  // Difficulty
  isHard: boolean;

  @Output() settingsState = new EventEmitter<boolean>();

  constructor(
    private settings: SettingsService,
    private variable: VariableService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.valueDimensions = +this.storage.getSync(
      this.storage.gridDimensionStorageName
    );
    this.isHard =
      this.storage.getSync(this.storage.difficultyStorageName) === 'hard';
  }

  selectGridDimension(event: any) {
    this.valueDimensions = event.value;
    this.settings.setGridDimensions(event.value);
  }

  switchDifficulty(): void {
    this.isHard = !this.isHard;
    this.settings.switchDifficulty(this.isHard);
  }

  selectTheme(event: any): void {
    this.settings.setTheme(event.currentTarget.id);
  }

  selectColor(event: any): void {
    this.settings.setColor(event.currentTarget.id);
  }

  selectAccessibility(event: any): void {
    this.settings.setAccessibility(event.currentTarget.id);
  }

  close(): void {
    this.settingsState.emit(false);
  }
}
