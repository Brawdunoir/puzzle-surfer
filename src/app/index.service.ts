import { Injectable } from '@angular/core';
import { GridService, Coordonnee } from './grid.service';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private grid: GridService, private variable: VariableService) {}

  /** Get the first grid index of a piece drop */
  getFirst(event: any): number {
    const element = event.source.getRootElement();
    const grid = document.querySelector('.game-screen__below mat-grid-list');

    const x = Math.round(
      element.getBoundingClientRect().x +
        this.grid.blocUnit / 2 -
        grid.getBoundingClientRect().x
    );
    const y =
      Math.round(
        element.getBoundingClientRect().y +
          this.grid.blocUnit / 2 -
          grid.getBoundingClientRect().y
      ) - this.variable.pieceTranslate(element.offsetHeight);

    const i = Math.trunc(y / this.grid.blocUnit);
    const j = Math.trunc(x / this.grid.blocUnit);

    return i * this.grid.dimensions + j;
  }

  /** Get grid index array of a piece drop  */
  get(firstIndex: number, jumps: number[]): number[] {
    const index: number[] = [];

    for (const jump of jumps) {
      index.push(firstIndex + jump);
    }

    return index;
  }

  /** Determine whether or not a piece drop is suitable at this position */
  isSuitable(
    indexArray: number[],
    originIndex: number,
    pieceDimX: number
  ): boolean {
    const dim = this.grid.dimensions;
    const origin = this.grid.indexToCoord(originIndex);
    for (const index of indexArray) {
      const coord = this.grid.indexToCoord(index);

      const alreadyExisting = this.grid.grid[index];
      const negativeIndex = index < 0;
      const outOfRangeBottom = coord.y >= dim;
      const outOfRangeRight = origin.x + pieceDimX >= dim + 1;

      if (
        alreadyExisting ||
        negativeIndex ||
        outOfRangeBottom ||
        outOfRangeRight
      ) {
        return false;
      }
    }
    return true;
  }
}
