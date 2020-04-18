import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { PieceDirective1, PieceDirective2, PieceDirective3 } from '../piece.directive';
import { PieceService } from '../piece.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';
import { CommonBlocComponent } from '../common-bloc/common-bloc.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild(PieceDirective1, { static: true }) pieceHost1: PieceDirective1;
  @ViewChild(PieceDirective2, { static: true }) pieceHost2: PieceDirective2;
  @ViewChild(PieceDirective3, { static: true }) pieceHost3: PieceDirective3;

  viewContainerArray: ViewContainerRef[] = [];

  gameEnd: boolean;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private pieceService: PieceService, private basic: BasicService,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.basic.init();

    this.viewContainerArray.push(this.pieceHost1.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost2.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost3.viewContainerRef);

    this.gameService.onPieceDrop.subscribe(value => {
      this.loadComponent();
    });
    this.gameService.onGameEnd.subscribe(() => {
      this.gameEnd = true;
    });
    this.gameService.onGameRestart.subscribe(() => {
      this.gameEnd = false;
    });
  }

  loadComponent() {
    for (const i of this.viewContainerArray) {
      // Choix aléatoire d'une pièce
      this.pieceService.getRandomID();
      // On enregistre son id
      this.gameService.addPiecesID(this.pieceService.random);
      // Préparer la recette de cette pièce
      const ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CommonBlocComponent);
      // Initialiser la vue
      const viewContainer = i;
      // Nettoyer l'ancien component du DOM
      viewContainer.clear();
      // Créer la pièce
      viewContainer.createComponent(ComponentFactory);
    }
  }
}
