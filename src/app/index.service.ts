import { Injectable } from '@angular/core';
import { BasicService, Coordonnee } from './basic.service';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private basic: BasicService, private variable: VariableService) {}

  getFirst(event: any): number {
    const element = event.source.getRootElement();
    const grid = document.querySelector('.game-screen__below mat-grid-list');

    const x = Math.round(
      element.getBoundingClientRect().x +
        this.basic.blocUnit / 2 -
        grid.getBoundingClientRect().x
    );
    const y =
      Math.round(
        element.getBoundingClientRect().y +
          this.basic.blocUnit / 2 -
          grid.getBoundingClientRect().y
      ) - this.variable.pieceTranslate(element.offsetHeight);

    const i = Math.trunc(y / this.basic.blocUnit);
    const j = Math.trunc(x / this.basic.blocUnit);

    return i * this.basic.dimensions + j;
  }

  get(firstIndex: number, jumps: number[]): number[] {
    const index: number[] = [];

    for (const jump of jumps) {
      index.push(firstIndex + jump);
    }

    return index;
  }

  isSuitable(indexArray: number[], originIndex: number, pieceDimX: number): boolean {
    const dim = this.basic.dimensions;
    const origin = this.basic.indexToCoord(originIndex);
    for (const index of indexArray) {
      const coord = this.basic.indexToCoord(index);

      const alreadyExisting = this.basic.grid[index];
      const negativeIndex = index < 0;
      const outOfRangeBottom = coord.y >= dim;
      const outOfRangeRight = origin.x + pieceDimX >= dim + 1;

      if (alreadyExisting || negativeIndex || outOfRangeBottom || outOfRangeRight) {
        return false;
      }
    }
    return true;
  }
}
