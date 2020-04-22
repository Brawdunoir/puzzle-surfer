import { Injectable } from '@angular/core';
import { Tile } from './tile-item';
import { Subject } from 'rxjs';
import { VariableService } from './variable.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = this.getDimensions();
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];

  updateGridEvent: Subject<boolean[]> = new Subject();
  updateTileEvent: Subject<Tile[]> = new Subject();

  constructor(
    private variable: VariableService,
    private storage: StorageService
  ) {}

  getDimensions(): number {
    if (!this.storage.get('dimensions')) {
      return this.variable.defaultGridSize;
    }

    return +this.storage.get('dimensions');
  }

  init() {
    this.getDimensions();
    this.getInitUnit();
    this.initGrid();
  }

  getInitUnit(): void {
    const gridEl: any = document.querySelector('app-grid mat-grid-list');
    this.blocUnit = gridEl.offsetWidth / this.dimensions;
  }

  initGrid(): void {
    this.tiles = [];
    this.grid = [];

    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.grid[i] = false;
      this.tiles.push({ color: '', filled: this.variable.tileHalf });
    }

    this.sendUpdates();
  }

  restart(): void {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = '';
      this.tiles[i].filled = this.variable.tileHalf;
    }

    this.sendUpdates();
  }

  updateGrid(indexArray: number[], filled: boolean, color: string = ''): void {
    for (const index of indexArray) {
      this.grid[index] = filled;
      this.tiles[index].color = color;
      this.tiles[index].filled = filled
        ? this.variable.tileFull
        : this.variable.tileHalf;
    }

    this.sendUpdates();
  }

  sendUpdates(): void {
    this.updateGridEvent.next(this.grid);
    this.updateTileEvent.next(this.tiles);
  }
}
