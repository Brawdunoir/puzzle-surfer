import { Injectable } from '@angular/core';
import { Tile } from './tile-item';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = 5; // TODO mettre ca dans les paramètres
  blocUnit: number;
  grid: boolean[];
  tiles: Tile[];
  protected defaultColor: '#131418';

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
      this.tiles.push({ color: this.defaultColor });
    }
  }

  updateGrid(
    index: number[],
    filled: boolean,
    color: string = this.defaultColor
  ) {
    index.forEach((element) => {
      this.grid[element] = filled;
      this.tiles[element].color = color;
    });
  }

  constructor() {}
}
