import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;
  accessibilityClassName = 'accessibility';

  constructor(private storage: StorageService, private basic: GridService) { }

  /** Get grid dimensions */
  getGridDimensions(): number {
    return this.basic.getDimensions();
  }

  /** Set grid dimensions */
  setGridDimensions(value: number) {
    this.storage.store('dimensions', value.toString());
  }

  /** Get current theme, if ne theme is registered, 'ligth' is the default one */
  getTheme(): string {
    const currentTheme = this.storage.get('theme');
    return currentTheme ? currentTheme : 'light';
  }

  /** Set theme */
  setTheme(theme: string): void {
    this.clearTheme();
    this.body.add(theme);
    this.storage.store('theme', theme);
  }

  /** Clear all themes  */
  private clearTheme(): void {
    this.body.remove('light');
    this.body.remove('dark');
    this.body.remove('amoled');
    this.body.remove('chrome');
  }

  /** Return accessibility mode */
  getAccessibility(): string {
    const currentAccessibility = this.storage.get(this.accessibilityClassName);
    return currentAccessibility ? currentAccessibility : 'false';
  }

  /** Set accessibility mode */
  setAccessibility(toggle: string): void {
    toggle === 'true'
      ? this.body.add(this.accessibilityClassName)
      : this.body.remove(this.accessibilityClassName);
    this.storage.store(this.accessibilityClassName, toggle);
  }

  /** return TRUE if HARD
   * return FALSE if EASY
   */
  isHard() {
    if (
      !this.storage.get('difficulty') ||
      this.storage.get('difficulty') === 'easy'
    ) {
      return false;
    } else {
      return true;
    }
  }

  /** Change difficulty to easy if hard, to hard if easy */
  switchDifficulty() {
    if (!this.storage.get('difficulty') || this.storage.get('difficulty') === 'hard') {
      this.storage.store('difficulty', 'easy');
    } else {
      this.storage.store('difficulty', 'hard');
    }
  }
}
