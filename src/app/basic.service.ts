import { Injectable } from '@angular/core';
import { Tile } from './tile-item';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  dimensions: number = 9; //TODO mettre ca dans les paramètres
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];

  init() {
    this.getInitUnit();
    this.initGrid();
  }

  getInitUnit(): void {
    this.blocUnit = window.innerWidth / this.dimensions;
  }

  initGrid(): void {
    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.grid[i] = false;
      this.tiles.push({ color: 'lightblue' });
    }
  }

  updateGrid(index: number[], filled: boolean) {
    index.forEach(element => {
      this.grid[element] = filled;
      filled ? this.tiles[element].color = 'lightgreen' : this.tiles[element].color = 'lightblue'
    });
  }

  constructor() { }
}
