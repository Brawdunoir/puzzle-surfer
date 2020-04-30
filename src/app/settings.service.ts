import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { BasicService } from './basic.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;
  accessibilityClassName = 'accessibility';

  constructor(private storage: StorageService, private basic: BasicService) { }

  getGridDimensions(): number {
    return this.basic.getDimensions();
  }

  setGridDimensions(value: number) {
    this.storage.store('dimensions', value.toString());
  }

  getTheme(): string {
    const currentTheme = this.storage.get('theme');
    return currentTheme ? currentTheme : 'light';
  }

  setTheme(theme: string): void {
    this.clearTheme();
    this.body.add(theme);
    this.storage.store('theme', theme);
  }

  clearTheme(): void {
    this.body.remove('default');
    this.body.remove('light');
    this.body.remove('dark');
    this.body.remove('amoled');
    this.body.remove('chrome');
  }

  getAccessibility(): string {
    const currentAccessibility = this.storage.get(this.accessibilityClassName);
    return currentAccessibility ? currentAccessibility : 'false';
  }

  setAccessibility(toggle: string): void {
    toggle === 'true'
      ? this.body.add(this.accessibilityClassName)
      : this.body.remove(this.accessibilityClassName);
    this.storage.store(this.accessibilityClassName, toggle);
  }

  /** return TRUE if HARD
   * return FALSE if EASY
   */
  getDifficulty() {
    if (
      !this.storage.get('difficulty') ||
      this.storage.get('difficulty') === 'easy'
    ) {
      return false;
    } else {
      return true;
    }
  }

  switchDifficulty() {
    if (!this.storage.get('difficulty') || this.storage.get('difficulty') === 'hard') {
      this.storage.store('difficulty', 'easy');
    } else {
      this.storage.store('difficulty', 'hard');
    }
  }
}
