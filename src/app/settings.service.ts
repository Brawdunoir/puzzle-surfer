import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;
  accessibilityClassName = 'accessibility';

  constructor(
    private storageService: StorageService,
    private storage: StorageMap,
  ) {}

  /** Set grid dimensions */
  setGridDimensions(value: number): void {
    this.storageService.setSync(this.storageService.gridDimensionStorageName, value.toString());
    console.log('Grid dimension changed to ' + value);
  }

  /** Change difficulty to easy if hard, to hard if easy */
  switchDifficulty(currentMode: boolean): void {
    let difficulty: string;
    !currentMode ? (difficulty = 'hard') : (difficulty = 'easy');
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

  // Set theme and accesibility on startup
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
}
