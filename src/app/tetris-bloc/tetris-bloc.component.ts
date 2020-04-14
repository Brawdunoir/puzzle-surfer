import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

import { MultiService } from '../multi.service';

@Component({
  selector: 'app-tetris-bloc',
  templateUrl: './tetris-bloc.component.html',
  styleUrls: ['./tetris-bloc.component.scss']
})
export class TetrisBlocComponent implements OnInit, OnDestroy {

  @Input() blocUnit: number;
  @Input() dimensions: number;
  @Input() grid: boolean[];

  @Output() newIndex = new EventEmitter<number[]>();
  index: number[] = [];

  // private xSource: number;
  // private ySource: number;

  private unavailableLocation: boolean = false;
  private display: boolean = true;

  constructor(private multiService: MultiService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  sendIndex() {
    if (this.unavailableLocation) {
      this.unavailableLocation = false;
      return;
    }

    this.newIndex.emit(this.index);
    this.display = false;
  }

  // onDragStarted(event) {
  //   this.xSource = event.source.getRootElement().getBoundingClientRect().x;
  //   this.ySource = event.source.getRootElement().getBoundingClientRect().y;
  // }

  onDragEnded(event) {
    let coord = this.multiService.getIndex(event, this.blocUnit);

    let first = coord.i * this.dimensions + coord.j

    // Haut tétris
    this.index.push(first + 1);
    // Bas gauche
    this.index.push(first + this.dimensions);
    // Bas milieu
    this.index.push(first + 1 + this.dimensions);
    // Bas droite
    this.index.push(first + 2 + this.dimensions);

    this.index.forEach(i => {
      if (this.grid[i]) {
        this.unavailableLocation = true;
        this.resetStyle(event);
      }
    });
    if (Math.max(...this.index) > this.grid.length) {
      this.unavailableLocation = true;
      this.resetStyle(event);
    }
  }

  resetStyle(event) {
    event.source.getRootElement().style.transform = 'translate3d(0, 0, 0)';
  }

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