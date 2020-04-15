import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

import { MultiService } from '../multi.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tetris-bloc',
  templateUrl: './tetris-bloc.component.html',
  styleUrls: ['./tetris-bloc.component.scss']
})
export class TetrisBlocComponent implements OnInit, OnDestroy {

  blocUnit: number;
  dimensions: number;

  index: number[] = [];

  private unavailableLocation: boolean = false;
  private display: boolean = true;

  constructor(private multiService: MultiService, private basic: BasicService, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.blocUnit = this.basic.blocUnit;
    this.dimensions = this.basic.dimensions;
  }

  ngOnDestroy(): void {
  }

  // TODO Dégager tout ca et le mettre dans le multi.service ?
  onDragEnded(event) {
    let coord = this.multiService.getIndex(event);
    let first = coord.i * this.dimensions + coord.j

    // Vider les index
    this.index = [];

    // Haut tétris
    this.index.push(first + 1);
    // Bas gauche
    this.index.push(first + this.dimensions);
    // Bas milieu
    this.index.push(first + 1 + this.dimensions);
    // Bas droite
    this.index.push(first + 2 + this.dimensions);

    this.index.forEach(i => {
      if (this.basic.grid[i]) {
        this.unavailableLocation = true;
        this.resetStyle(event);
      }
    });
    if (Math.max(...this.index) > this.basic.grid.length) {
      this.unavailableLocation = true;
      this.resetStyle(event);
    }
    if (!this.unavailableLocation) {
      this.gameService.uponIndexReceived(this.index, 0);
      this.display = false;
    }
  }


  private resetStyle(event) {
    event.source._dragRef.reset();
  }

  // TODO maybe clean ca ?
  setMyStyles() {
    let styles = {
      'height': this.blocUnit * 2 + 'px',
      'width': this.blocUnit * 3 + 'px',
      'display': this.display ? '' : 'none',
    };
    return styles;
  }

  setMyStylesTile1() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'left': this.blocUnit + 'px',
    };
    return styles;
  }
  setMyStylesTile2() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'top': this.blocUnit + 'px',
    };
    return styles;
  }
  setMyStylesTile3() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'left': this.blocUnit + 'px',
      'top': this.blocUnit + 'px',
    };
    return styles;
  }
  setMyStylesTile4() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'left':  2 * this.blocUnit + 'px',
      'top': this.blocUnit + 'px',
    };
    return styles;
  }
}