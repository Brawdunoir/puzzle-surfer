import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  body = document.querySelector('body').classList;

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
    this.body.remove('default');
    this.body.remove('light');
    this.body.remove('dark');
    this.body.remove('amoled');
    this.body.remove('chrome');
  }
}
