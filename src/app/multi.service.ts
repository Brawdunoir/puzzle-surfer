import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiService {

  getIndex(event, blocUnit) {
    let element = event.source.getRootElement();
    let grid = document.querySelector('.game_screen__below');

    let x: number;
    let y: number;

    x = (element.getBoundingClientRect().x + blocUnit / 2 - grid.getBoundingClientRect().x);
    y = (element.getBoundingClientRect().y + blocUnit / 2 - grid.getBoundingClientRect().y);
    console.log('x: ' + x + ' y: ' + y);

    return {
      i: Math.trunc(y / blocUnit),
      j: Math.trunc(x / blocUnit)
    }
  }

  constructor() { }
}
