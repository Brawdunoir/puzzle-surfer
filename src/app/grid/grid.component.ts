import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export interface Tile {
  color: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  private eventsSubscription: Subscription;
  
  @Input() dimensions: number;
  @Input() blocUnit: number;
  @Input() grid: boolean[];
  @Input() indexReceived: Observable<void>;
  tiles: Tile[] = [];
  
  constructor() {
  }

  ngOnInit(): void {
    this.eventsSubscription = this.indexReceived.subscribe(() => this.updateTiles());
    this.initGrid();
    this.tiles[2].color = 'lightgreen';
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
  
  // Instancier la grille
  initGrid() {
    for (let i = 0; i < this.grid.length; i++) {
      this.tiles.push({ color: 'lightblue' });
    }
  }  
  
  @ViewChild('overGrid') d1: ElementRef;
  addBlocFill() {
    this.d1.nativeElement.insertAdjacentHTML(
      'beforeend',
      '<div class="filled" [ngStyle]="{height.px: blocUnit, width.px: blocUnit, background-size px: blocUnit}"></div>');
  }
  
  updateTiles() {
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i]) {
        this.tiles[i].color = 'lightgreen';
      } else {
        this.tiles[i].color = 'lightblue';
      }
    }
  }
}