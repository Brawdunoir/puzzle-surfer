import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';

import { MultiService } from '../multi.service';

@Component({
  selector: 'app-single-bloc',
  templateUrl: './single-bloc.component.html',
  styleUrls: ['./single-bloc.component.scss']
})
export class SingleBlocComponent implements OnInit, OnDestroy {

  @Input() blocUnit: number;
  @Input() dimensions: number;
  @Input() grid: boolean[];

  @Output() newIndex = new EventEmitter<number[]>();
  index: number[] = [];

  private xSource: number;
  private ySource: number;

  private unavailableLocation: boolean = false;
  private display: boolean = true;
  
  constructor(private multiService : MultiService) {
    
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

  onDragStarted(event) {
    this.xSource = event.source.getRootElement().getBoundingClientRect().x;
    this.ySource = event.source.getRootElement().getBoundingClientRect().y;
  }
  
  onDragEnded(event) {
    let coord = this.multiService.getIndex(event, this.blocUnit);

    this.index.push(coord.i * this.dimensions + coord.j);

    this.index.forEach(i => {
      if (this.grid[i]) {
        this.unavailableLocation = true;
      }
    });
    if (Math.max(...this.index) > this.grid.length) {
      this.unavailableLocation = true;
    }
  }
  
  setMyStyles() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'backgroundColor': 'lightgreen',
      'display': this.display ? '' : 'none',
    };
    return styles;
  }
}
