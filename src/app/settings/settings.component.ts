import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';
import { StorageService } from '../storage.service';
import { BasicService } from '../basic.service';

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

  constructor(private storage: StorageService, private basic: BasicService) {}

  ngOnInit(): void {}

  changeGridDimension(event: any) {
    this.storage.store('dimensions', event.value);
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
