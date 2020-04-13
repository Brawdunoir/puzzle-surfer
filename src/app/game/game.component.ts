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
  // index: number;
  private score: number = 0;
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
    // this.index = index;
    this.grid[index] = true;

    // On regarde si on a réussit à compléter une ligne/colonne
    this.checkGrid();

    // On update le visuel dans grid-component
    this.eventIndexReceived.next();
  }

  checkGrid() {
    let col: boolean;
    let lig: boolean;
    // On vérifie si c'est complet
    for (let i = 0; i < this.dimensions; i++) {
      lig = true;
      col = true;
      for (let j = 0; j < this.dimensions; j++) {
        // Lignes
        if (!this.grid[i * this.dimensions + j]) {
          lig = false;
        }
        // Colonnes
        if (!this.grid[i + j * this.dimensions]) {
          col = false;
        }
      }
      // On retire si c'est toujours vrai
      if (lig) {
        for (let j = 0; j < this.dimensions; j++) {
          this.grid[i * this.dimensions + j] = false;
        }
        this.score += this.dimensions;
      }
      if (col) {
        for (let j = 0; j < this.dimensions; j++) {
          this.grid[i + j * this.dimensions] = false;
        }
        this.score += this.dimensions;
      }
    }
  }

}
