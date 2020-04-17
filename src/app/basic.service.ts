import { Injectable } from '@angular/core';
import { Tile } from './tile-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = 15; // TODO mettre ca dans les paramètres
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];
  defaultColor = '#11100f';

  updateGridEvent: BehaviorSubject<boolean[]> = new BehaviorSubject(this.grid);
  updateTileEvent: BehaviorSubject<Tile[]> = new BehaviorSubject(this.tiles);

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
    this.sendUpdates();
  }

  restart() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = this.defaultColor;
    }
    this.sendUpdates();
  }

  updateGrid(index: number[], filled: boolean, color: string = '') {
    index.forEach((element) => {
      this.grid[element] = filled;
      this.tiles[element].color = color;
    });
    this.sendUpdates();
  }

  sendUpdates() {
    this.updateGridEvent.next(this.grid);
    this.updateTileEvent.next(this.tiles);
  }

  constructor() {}
}
