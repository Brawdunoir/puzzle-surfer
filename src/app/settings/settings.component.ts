import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // Slider
  min = 8;
  max = 30;
  value = 10;
  color = 'primary';
  // Themes
  nbStyle = 4;
  nbColor = 3;
  currentStyle = 'amoled';
  currentColor = 'sepia';

  constructor(private variables: VariableService) {}

  ngOnInit(): void {}

  changeGridDimension(event: any) {
    // TODO changer avec service localStorage.
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
