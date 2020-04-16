import { Injectable } from '@angular/core';
import { Tile } from './tile-item';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = 7; // TODO mettre ca dans les paramètres
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];
  defaultColor = '201f1e';

  init() {
    this.getInitUnit();
    this.initGrid();
  }

  getInitUnit(): void {
    this.blocUnit = window.innerWidth / this.dimensions;
  }

  initGrid(): void {
    this.tiles = [];
    this.grid = [];

    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.grid[i] = false;
      this.tiles.push({ color: '' });
    }
  }

  restartGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = this.defaultColor;
    }
  }

  updateGrid(
    index: number[],
    filled: boolean,
    color: string = ''
  ) {
    index.forEach((element) => {
      this.grid[element] = filled;
      this.tiles[element].color = color;
    });
  }

  constructor() { }
}
