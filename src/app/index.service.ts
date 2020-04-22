import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class IndexService {
  constructor(private basic: BasicService) {}

  get(event: any, jumps: number[]): number[] {
    return this.getFromPiece(this.getFirst(event), jumps);
  }

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
      ) - element.offsetHeight;

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

  isSuitable(indexArray: number[]): boolean {
    for (const index of indexArray) {
      const alreadyExisting = this.basic.grid[index];
      const negativeIndex = index < 0;
      const outOfRangeIndex = index > this.basic.grid.length;

      if (alreadyExisting || negativeIndex || outOfRangeIndex) {
        return false;
      }
    }

    return true;
  }
}
