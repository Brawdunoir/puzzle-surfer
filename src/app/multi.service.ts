import { Injectable, OnInit } from '@angular/core';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class MultiService {
  
  constructor(private basic: BasicService) { }

  getIndex(event) {
    let element = event.source.getRootElement();
    let grid = document.querySelector('.game_screen__below');

    let x = (element.getBoundingClientRect().x + this.basic.blocUnit / 2 - grid.getBoundingClientRect().x);
    let y = (element.getBoundingClientRect().y + this.basic.blocUnit / 2 - grid.getBoundingClientRect().y);

    return {
      i: Math.trunc(y / this.basic.blocUnit),
      j: Math.trunc(x / this.basic.blocUnit)
    }
  }

}
