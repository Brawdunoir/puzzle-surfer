import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage.service';
import { BasicService } from '../basic.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // Slider
  min = 8;
  max = 20;
  value = this.basic.getDimensions();
  color = 'primary';

  @Output() settingsState = new EventEmitter<boolean>();

  constructor(
    private storage: StorageService,
    private basic: BasicService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {}

  changeGridDimension(event: any) {
    this.storage.store('dimensions', event.value);
  }

  selectTheme(event: any): void {
    this.settings.setTheme(event.currentTarget.id);
  }

  close(): void {
    this.settingsState.emit(false);
  }
}
