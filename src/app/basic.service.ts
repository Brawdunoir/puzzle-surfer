import { Injectable } from '@angular/core';
import { Tile } from './tile-item';
import { BehaviorSubject } from 'rxjs';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  dimensions = 7; // TODO mettre ca dans les paramètres
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];

  updateGridEvent: BehaviorSubject<boolean[]> = new BehaviorSubject(this.grid);
  updateTileEvent: BehaviorSubject<Tile[]> = new BehaviorSubject(this.tiles);

  init() {
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

  restart() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = this.variable.defaultColor;
      this.tiles[i].filled = this.variable.tileHalf;
    }
    this.sendUpdates();
  }

  updateGrid(index: number[], filled: boolean, color: string = '') {
    index.forEach((element) => {
      this.grid[element] = filled;
      this.tiles[element].color = color;
      this.tiles[element].filled = filled
        ? this.variable.tileFull
        : this.variable.tileHalf;
    });
    this.sendUpdates();
  }

  sendUpdates() {
    this.updateGridEvent.next(this.grid);
    this.updateTileEvent.next(this.tiles);
  }

  constructor(private variable: VariableService) {}
}
