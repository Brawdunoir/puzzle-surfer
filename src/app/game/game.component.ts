import { Component, OnInit, HostListener } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  blocUnit: number;
  dimensions: number = 4;
  index: number;
  eventIndexReceived: Subject<void> = new Subject<void>();
  private grid: boolean[] = [];


  constructor() { }

  ngOnInit(): void {
    this.getInitUnit();
    this.initGrid();
  }

  initGrid() {
    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.grid[i] = false;
      console.log(i);
    }
  }
  // Récupérer l'unité d'un bloc pour le background-size
  @HostListener('window:resize', ['$event'])
  getDynamicUnit(event?) {
    this.blocUnit = window.innerWidth / this.dimensions;
  }
  
  getInitUnit() {
    this.blocUnit = window.innerWidth / this.dimensions;
  }

  getIndex(index: number) {
    this.index = index;
    this.grid[index] = true;
    this.eventIndexReceived.next();
  }

}
