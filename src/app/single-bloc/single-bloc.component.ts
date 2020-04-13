import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-single-bloc',
  templateUrl: './single-bloc.component.html',
  styleUrls: ['./single-bloc.component.scss']
})
export class SingleBlocComponent implements OnInit {

  @Output() newIndex = new EventEmitter<number>();
  @Input() blocUnit: number;
  @Input() dimensions: number;
  @Input() grid: boolean[];
  index: number;
  
  constructor() {
    
  }
  
  ngOnInit(): void {
  }

  sendIndex() {
    this.newIndex.emit(this.index);
  }
  
  onDragEnded(event) {
    let element = event.source.getRootElement();
    let grid = document.querySelector('.game_screen__below');
    
    let x: number;
    let y: number;

    let i: number;
    let j: number;

    x = (element.getBoundingClientRect().x + this.blocUnit / 2 - grid.getBoundingClientRect().x);
    y = (element.getBoundingClientRect().y + this.blocUnit / 2 - grid.getBoundingClientRect().y);
    console.log('x: ' + x + ' y: ' + y);

    i = Math.trunc(y / this.blocUnit);
    j = Math.trunc(x / this.blocUnit);

    this.index = i * this.dimensions + j;
  }
  
  // getPosition(event) {
  //   let offsetLeft = 0;
  //   let offsetTop = 0;

  //   let el = event.srcElement;
    
  //   while (el) {
  //     offsetLeft += el.offsetLeft;
  //     offsetTop += el.offsetTop;
  //     el = el.parentElement.parentElement;
  //   }
  //   return { offsetTop: offsetTop, offsetLeft: offsetLeft }
  // }
  
  setMyStyles() {
    let styles = {
      'height': this.blocUnit + 'px',
      'width': this.blocUnit + 'px',
      'backgroundColor': 'lightgreen',
    };
    return styles;
  }
}
