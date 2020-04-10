import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() nbRows:number;
  @Input() nbColumns:number;
  grid: boolean[][];

  constructor() { }

  ngOnInit(): void {
    this.grid = []
    for (let i = 0; i < this.nbRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.nbColumns; j++) {
        this.grid[i][j]= false;
      }    
    }
  }

  

}
