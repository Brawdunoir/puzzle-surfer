import { Injectable } from '@angular/core';
import { Tile } from './tile-item';
import { Subject } from 'rxjs';
import { VariableService } from './variable.service';
import { StorageService } from './storage.service';
import { StorageMap } from '@ngx-pwa/local-storage';

export interface Coordonnee {
  x: number;
  y: number;
}

interface GridData {
  Tiles: Tile[];
  Grid: boolean[];
}

@Injectable({
  providedIn: 'root',
})
export class GridService {
  dimensions: number;
  blocUnit: number;
  grid: boolean[] = [];
  tiles: Tile[] = [];

  // Trigger when dimensions has changed for grid component
  update: Subject<Tile[]> = new Subject();

  constructor(
    private variable: VariableService,
    private storageService: StorageService,
    private storage: StorageMap
  ) {}

  /** Initialize basic variables for grid and display */
  init(): void {
    this.dimensions = this.getDimensions();
    this.blocUnit = this.getWidth();

    this.initGrid();
  }

  getDimensions(): number {
    return +this.storageService.getSync(
      this.storageService.gridDimensionStorageName
    );
  }

  getDifficulty(): boolean {
    return (
      this.storageService.getSync(this.storageService.difficultyStorageName) ===
      'hard'
    );
  }

  /** Get bloc unit for one unit on the grid to be a square */
  getWidth(): number {
    const gridEl: any = document.querySelector('app-grid mat-grid-list');
    return (this.blocUnit = gridEl.offsetWidth / this.dimensions);
  }

  getHeight(): number {
    const gridEl: any = document.querySelector('app-grid mat-grid-list');
    return (this.blocUnit = gridEl.offsetHeight / this.dimensions);
  }

  /** Initialize grid */
  initGrid(): void {
    this.storage
      .get(
        this.storageService.getGridStorageKey(
          this.getDifficulty(),
          this.dimensions
        )
      )
      .subscribe((data: GridData) => {
        if (data !== undefined) {
          this.tiles = data.Tiles;
          this.grid = data.Grid;
          this.update.next(this.tiles);
        } else {
          this.tiles = [];
          this.grid = [];
          for (let i = 0; i < this.dimensions * this.dimensions; i++) {
            this.grid[i] = false;
            this.tiles.push({ color: '', filled: this.variable.tileHalf });
          }
        }
      });
    // TODO: La grille peut déjà être sauvegardée, check avant de l'initialiser.
  }

  /** Reinitialize the grid */
  restart(): void {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = false;
      this.tiles[i].color = '';
      this.tiles[i].filled = this.variable.tileHalf;
    }
  }

  /** Convert index (eg 11) to coordinates (eg (3,1)) with grid dimensions (eg 8) */
  indexToCoord(index: number): Coordonnee {
    const x = index % this.dimensions;
    const y = Math.trunc(index / this.dimensions);
    return { x, y };
  }

  /** Update tile on the grid
   * @param indexArray index of the tile
   * @param filled filled or not
   * @param color color of the tile (eg color of the piece dropped)
   */
  updateFromIndex(
    indexArray: number[],
    filled: boolean,
    color: string = ''
  ): void {
    for (const index of indexArray) {
      this.grid[index] = filled;
      this.tiles[index].color = color;
      this.tiles[index].filled = filled
        ? this.variable.tileFull
        : this.variable.tileHalf;
      // ? Save this move in the data storage
      const data: GridData = { Tiles: this.tiles, Grid : this.grid };
      this.storage.set(this.storageService.getGridStorageKey(this.getDifficulty(), this.dimensions), data).subscribe();
    }
  }

  /** Update tiles in a whole dimension on the grid
   * For example: Fill all tiles in the fifth column in red
   * @param dim 'row' or 'column'
   * @param ind index of the dimension
   * @param filled filled or not
   * @param color color of the tile (eg color of the piece dropped)
   */
  updateFromDim(
    dim: string = '',
    ind: number,
    filled: boolean,
    color: string = ''
  ): void {
    const index = [];
    for (let i = 0; i < this.dimensions; i++) {
      if (dim === 'row') {
        index.push(ind * this.dimensions + i);
      } else if (dim === 'column') {
        index.push(ind + this.dimensions * i);
      }
    }
    this.updateFromIndex(index, filled, color);
  }
}
