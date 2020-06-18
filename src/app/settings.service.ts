import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageService } from './storage.service';
import { PieceService } from './piece.service';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;
  accessibilityClassName = 'accessibility';

  constructor(
    private storageService: StorageService,
    private storage: StorageMap,
    private pieceService: PieceService,
    private grid: GridService,
  ) {}

  /** Set grid dimensions */
  setGridDimensions(value: number): void {
    this.storageService.setSync(this.storageService.gridDimensionStorageName, value.toString());
    console.log('Grid dimension changed to ' + value);
  }

  /** Change difficulty to easy if hard, to hard if easy */
  switchDifficulty(currentMode: boolean): void {
    let difficulty: string;
    !currentMode ? (difficulty = 'easy') : (difficulty = 'hard');
    this.storageService.setSync(this.storageService.difficultyStorageName, difficulty);
    console.log('Diffuculty changed to ' + difficulty);
  }

  /** Set theme */
  setTheme(theme: string): void {
    this.storage
      .set(this.storageService.themeStorageName, theme, { type: 'string' })
      .subscribe(() => {
        if (theme !== undefined) {
          this.clearTheme();
          this.body.add(theme);
          console.log('Theme has been changed to ' + theme);
        } else {
          console.warn('The selected theme is undefined ?');
        }
      });
    }

    /** Set color */
  setColor(color: string): void {
    this.storage.set(this.storageService.colorStorageName, color, { type: 'string' }).subscribe(() => {
      if (color !== undefined) {
        this.clearColor();
        this.body.add(color);
        this.pieceService.changeColor(color);
        this.grid.changeColor(color);
        console.log('Color has been changed to ' + color);
      } else {
        console.warn('The selected color is undefined ?');
      }
    });
  }

  /** Set accessibility mode */
  setAccessibility(toggle: string): void {
    this.storage
      .set(this.storageService.accessibilityStorageName, toggle)
      .subscribe(() => {
        if (toggle !== undefined) {
          toggle === 'true'
            ? this.body.add(this.accessibilityClassName)
            : this.body.remove(this.accessibilityClassName);
          console.log('Accessibility mode is now set to ' + toggle);
        } else {
          console.warn('The accessibility mode selectionned is undefined ?');
        }
      });
  }

  // Set theme, color and accesibility on startup
  setAppareance(): void {
    this.storage
      .get(this.storageService.themeStorageName, { type: 'string' })
      .subscribe((theme) => {
        if (theme !== undefined) {
          this.clearTheme();
          this.body.add(theme);
        } else {
          console.warn('Stored theme is undefinied ?');
        }
      });

    this.storage
      .get(this.storageService.colorStorageName, { type: 'string' })
      .subscribe((color) => {
        if (color !== undefined) {
          this.clearColor();
          this.body.add(color);
          this.pieceService.changeColor(color);
        } else {
          console.warn('Stored color is undefinied ?');
        }
      });

    this.storage
      .get(this.storageService.accessibilityStorageName, { type: 'boolean' })
      .subscribe((acc) => {
        if (acc !== undefined) {
          acc
            ? this.body.add(this.accessibilityClassName)
            : this.body.remove(this.accessibilityClassName);
        } else {
          console.warn('Stored accessibility is undefined ?');
        }
      });
  }

  /** Clear all themes  */
  private clearTheme(): void {
    this.body.remove('light');
    this.body.remove('dark');
    this.body.remove('amoled');
    this.body.remove('chrome');
  }

  /** Clear all color */
  private clearColor(): void {
    this.body.remove('multicolor');
    this.body.remove('light-blue');
    this.body.remove('red');
    this.body.remove('orange');
    this.body.remove('green');
    this.body.remove('indigo');
    this.body.remove('purple');
  }
}
