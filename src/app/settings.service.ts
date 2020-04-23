import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;
  accessibilityClassName = 'accessibility';

  constructor(private storage: StorageService) {}

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
    this.body.remove('light');
    this.body.remove('dark');
    this.body.remove('amoled');
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
}
