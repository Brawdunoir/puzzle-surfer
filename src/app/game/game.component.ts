import { Component, OnInit, HostListener, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, ComponentFactory, ComponentDecorator, Input, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TetrisBlocComponent } from '../tetris-bloc/tetris-bloc.component';
import {  PieceDirective1, PieceDirective2, PieceDirective3 } from '../piece.directive';
import { PieceItem } from '../piece-item';
import { PieceComponent } from '../piece.component';
import { PieceService } from '../piece.service';
import { MultiService } from '../multi.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  
  // blocUnit: number;
  // dimensions: number = 20;
  // grid: boolean[] = [];
  
  // score: number = 0;
  // eventIndexReceived: Subject<void> = new Subject<void>();
  
  
  // private piecesIsOff: boolean[] = [];
  // private notDestroy = true;
  
  // @ViewChild('tetrisBloc', { read: ViewContainerRef }) tetrisBlocContainer: any;
  
  pieces: PieceItem[];
  @ViewChild(PieceDirective1, { static: true }) pieceHost1: PieceDirective1;
  @ViewChild(PieceDirective2, { static: true }) pieceHost2: PieceDirective2;
  @ViewChild(PieceDirective3, { static: true }) pieceHost3: PieceDirective3;
  currentPieceIndex: number = -1;
  
  viewContainerArray: ViewContainerRef[] = [];



  constructor(private componentFactoryResolver: ComponentFactoryResolver, private pieceService: PieceService, private multiService: MultiService, private basic : BasicService, private gameService: GameService) { }

  ngOnInit(): void {
    this.basic.init();
    // this.multiService.ngOnInit();
    // this.blocUnit = this.multiService.blocUnit;
    // this.dimensions = this.multiService.dimensions;
    // this.grid = this.multiService.grid;

    this.pieces = this.pieceService.getPieces();
    this.viewContainerArray.push(this.pieceHost1.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost2.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost3.viewContainerRef);

    this.gameService.dropPiece.subscribe(value => {
      console.log("coucou");
      this.loadComponent();
    })
    
    // this.game();
  }

  loadComponent() {
    for (let i = 0; i < this.viewContainerArray.length; i++) {
      // Choix aléatoire d'une pièce
      this.currentPieceIndex = (this.currentPieceIndex + 1) % this.pieces.length;
      // On enregistre son id
      this.gameService.addPiecesID(this.currentPieceIndex);
      // Récupérer sa data
      const pieceItem = this.pieces[this.currentPieceIndex];
      // Préparer la recette de cette pièce
      const ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(pieceItem.component);
      // Initialiser la vue
      const viewContainer = this.viewContainerArray[i];
      // Nettoyer l'ancien component du DOM
      viewContainer.clear();
      // Créer la pièce
      viewContainer.createComponent(ComponentFactory);
    }
  }


  // initGrid() {
  //   for (let i = 0; i < this.dimensions * this.dimensions; i++) {
  //     this.grid[i] = false;
  //   }
  // }
  // // Récupérer l'unité d'un bloc pour le background-size
  // @HostListener('window:resize', ['$event'])
  // getDynamicUnit(event?) {
  //   this.blocUnit = window.innerWidth / this.dimensions;
  // }
  
  // getInitUnit() {
  //   this.blocUnit = window.innerWidth / this.dimensions;
  // }

  // getIndex(index: number[]) {
  //   index.forEach(element => {
  //     this.grid[element] = true;
  //     this.score++;
  //   });

  //   // On regarde si on a réussit à compléter une ligne/colonne
  //   this.checkGrid();

  //   // On update le visuel dans grid-component
  //   this.eventIndexReceived.next();
  // }

  // checkGrid() {
  //   let col: boolean;
  //   let lig: boolean;
  //   // On vérifie si c'est complet
  //   for (let i = 0; i < this.dimensions; i++) {
  //     lig = true;
  //     col = true;
  //     for (let j = 0; j < this.dimensions; j++) {
  //       // Lignes
  //       if (!this.grid[i * this.dimensions + j]) {
  //         lig = false;
  //       }
  //       // Colonnes
  //       if (!this.grid[i + j * this.dimensions]) {
  //         col = false;
  //       }
  //     }
  //     // On retire si c'est toujours vrai
  //     if (lig) {
  //       for (let j = 0; j < this.dimensions; j++) {
  //         this.grid[i * this.dimensions + j] = false;
  //       }
  //       this.score += this.dimensions;
  //     }
  //     if (col) {
  //       for (let j = 0; j < this.dimensions; j++) {
  //         this.grid[i + j * this.dimensions] = false;
  //       }
  //       this.score += this.dimensions;
  //     }
  //   }
  // }

}
