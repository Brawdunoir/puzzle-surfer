import { Injectable } from '@angular/core';
import { Tile } from './tile-item';
import { Subject } from 'rxjs';
import { VariableService } from './variable.service';
import { StorageService } from './storage.service';

export interface Coordonnee {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = this.getDimensions();
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];

  // Trigger when dimensions has changed for grid component
  update: Subject<Tile[]> = new Subject();

  constructor(
    private variable: VariableService,
    private storage: StorageService
  ) { }

  init() {
    this.dimensions = this.getDimensions();
    this.getInitUnit();
    this.initGrid();
  }

  getDimensions(): number {
    if (!this.storage.get('dimensions')) {
      return this.variable.defaultGridSize;
    }

    return +this.storage.get('dimensions');
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

    this.update.next(this.tiles);
  }

  restart(): void {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = '';
      this.tiles[i].filled = this.variable.tileHalf;
    }
  }

  indexToCoord(index: number): Coordonnee {
    const x = index % this.dimensions;
    const y = Math.trunc(index / this.dimensions);
    return { x, y };
  }

  updateGrid(indexArray: number[], filled: boolean, color: string = ''): void {
    for (const index of indexArray) {
      this.grid[index] = filled;
      this.tiles[index].color = color;
      this.tiles[index].filled = filled
        ? this.variable.tileFull
        : this.variable.tileHalf;
    }
  }

  updateGridFromIndex(type: string = '', ind: number, filled: boolean, color: string = ''): void {
    const index = [];
    for (let i = 0; i < this.dimensions; i++) {
      if (type === 'row') {
        index.push(ind * this.dimensions + i);
      } else if (type === 'column') {
        index.push(ind + i * this.dimensions);
      }
    }
    this.updateGrid(index, filled, color);
  }
}
