import { Component, OnInit, Input } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() nbRows: number;
  @Input() nbColumns: number;
  blocUnit: number;
  grid: boolean[][];

  constructor() {
  }

  ngOnInit(): void {
    this.initGrid();
    this.getUnit();
    this.grid[2][2] = true;
  }
  
  // Instancier la grille logique
  initGrid() {
    this.grid = []
    for (let i = 0; i < this.nbRows; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.nbColumns; j++) {
        this.grid[i][j] = false;
      }
    }
  }
  
  // Récupérer l'unité d'un bloc pour le background-size
  @HostListener('window:resize', ['$event'])
  getUnit(event?) {
    this.blocUnit = window.innerWidth / this.nbColumns;
  }
}