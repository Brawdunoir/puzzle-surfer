import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = window.localStorage;

  constructor() {}

  get(key: string): string {
    return this.storage.getItem(key);
  }

  store(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  delete(key: string): void {
    this.storage.removeItem(key);
  }

  deleteAll(): void {
    this.storage.clear();
  }
}
