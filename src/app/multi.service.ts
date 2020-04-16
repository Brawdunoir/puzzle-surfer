import { Injectable, OnInit } from '@angular/core';
import { BasicService } from './basic.service';
import { PieceService } from './piece.service';

@Injectable({
  providedIn: 'root'
})
export class MultiService {

  constructor(private basic: BasicService, private pieceService: PieceService) { }

  getIndex(event: any, jumps: number[]) {
    return this.getPieceIndex(this.getFirstIndex(event), jumps);
  }

  getFirstIndex(event: any) {
    const element = event.source.getRootElement();
    const grid = document.querySelector('.game_screen__below');

    const x = Math.round(element.getBoundingClientRect().x + this.basic.blocUnit / 2 - grid.getBoundingClientRect().x);
    const y = Math.round(element.getBoundingClientRect().y + this.basic.blocUnit / 2 - grid.getBoundingClientRect().y);

    const i = Math.trunc(y / this.basic.blocUnit);
    const j = Math.trunc(x / this.basic.blocUnit);

    return (i * this.basic.dimensions + j);
  }

  getPieceIndex(firstIndex: number, jumps: number[]) {
    const index: number[] = [];

    jumps.forEach(jump => {
      index.push(firstIndex + jump);
    });

    return index;
  }


  isSuitable(index: number[]) {
    let suitable = true;
    index.forEach(element => {
      if (this.basic.grid[element]) {
        suitable = false;
      }
    });
    if (Math.max(...index) > this.basic.grid.length) {
      suitable = false;
    }

    return suitable;
  }
}
