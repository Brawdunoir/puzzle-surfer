import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  PieceDirective1,
  PieceDirective2,
  PieceDirective3,
} from '../piece.directive';
import { PieceService } from '../piece.service';
import { GridService } from '../grid.service';
import { GameService } from '../game.service';
import { CommonBlocComponent } from '../common-bloc/common-bloc.component';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  // The three 'View' on the bottom : pieces left to be placed
  @ViewChild(PieceDirective1, { static: true }) pieceHost1: PieceDirective1;
  @ViewChild(PieceDirective2, { static: true }) pieceHost2: PieceDirective2;
  @ViewChild(PieceDirective3, { static: true }) pieceHost3: PieceDirective3;

  viewContainerArray: ViewContainerRef[] = [];

  displaySettings: boolean;
  displayMenu: boolean;
  messageMenu: string;

  reloadPiece: any;
  end: any;
  restart: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.gameService.initialization();

    this.viewContainerArray.push(this.pieceHost1.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost2.viewContainerRef);
    this.viewContainerArray.push(this.pieceHost3.viewContainerRef);
    this.reloadPiece = this.gameService.reloadPiece.subscribe((value) => {
      if (value === -1) {
        this.loadAllComponents();
      } else {
        this.loadComponent(this.viewContainerArray[value]);
      }
    });
    this.end = this.gameService.end.subscribe(() => {
      this.displayMenu = true;
      this.messageMenu = 'vous avez perdu';
    });
    this.restart = this.gameService.restart.subscribe(() => {
      this.displayMenu = false;
    });

    console.log('Restore game...');
    this.restore();
    console.log('Game restored.');
  }

  ngOnDestroy(): void {
    this.reloadPiece.unsubscribe();
    this.end.unsubscribe();
    this.restart.unsubscribe();
  }

  loadAllComponents() {
    for (const view of this.viewContainerArray) {
      this.loadComponent(view);
    }
  }

  loadComponent(view: ViewContainerRef) {
    const viewID = this.viewContainerArray.indexOf(view);
    // Choix aléatoire d'une pièce et ajout de celle ci dans le jeu logique
    this.gameService.addPiece(viewID);
    // Building component
    this.buildComponent(view);
  }

  restore(): void {
    for (const view of this.viewContainerArray) {
      const viewID = this.viewContainerArray.indexOf(view);
      // Restores in a logic way the piece
      const build = this.gameService.restores(viewID);
      if (build) {
        // Build the component (piece)
        this.buildComponent(view);
      }
    }
  }

  buildComponent(view: ViewContainerRef): void {
    // Prepare the recipy for a CommonBlocComponent
    const ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CommonBlocComponent
    );
    // Clear DOM from previous object
    view.clear();
    // Create Component
    view.createComponent(ComponentFactory);
  }

  menu(event: boolean): void {
    this.messageMenu = 'pause';
    this.displayMenu = event;
  }

  showSettings(event: boolean): void {
    this.displaySettings = event;
  }
}
