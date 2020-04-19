import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { VariableService } from './variable.service';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private basic: BasicService, private variable: VariableService) {}

  get(event: any, jumps: number[]): number[] {
    return this.getFromPiece(this.getFirst(event), jumps);
  }

  getFirst(event: any): number {
    const element = event.source.getRootElement();
    const grid = document.querySelector('.game_screen__below mat-grid-list');

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
      ) - this.variable.pieceTranslate;

    const i = Math.trunc(y / this.basic.blocUnit);
    const j = Math.trunc(x / this.basic.blocUnit);

    return i * this.basic.dimensions + j;
  }

  getFromPiece(firstIndex: number, jumps: number[]): number[] {
    const index: number[] = [];

    for (const jump of jumps) {
      index.push(firstIndex + jump);
    }

    return index;
  }

  isSuitable(index: number[]): boolean {
    for (const element of index) {
      const alreadyExisting = this.basic.grid[element];
      const negativeIndex = element < 0;
      const outOfRangeIndex = element > this.basic.grid.length;

      if (alreadyExisting || negativeIndex || outOfRangeIndex) {
        return false;
      }
    }

    return true;
  }
}
