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
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';
import { CommonBlocComponent } from '../common-bloc/common-bloc.component';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
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
    private pieceService: PieceService,
    private basic: BasicService,
    private gameService: GameService,
    private settings: SettingsService
  ) {}

  init() {
    this.basic.init();
    this.pieceService.init();
  }

  ngOnInit(): void {
    this.settings.setTheme(this.settings.getTheme());
    this.settings.setAccessibility(this.settings.getAccessibility());
    this.init();
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
  }

  ngOnDestroy(): void {
    this.reloadPiece.unsubscribe();
    this.end.unsubscribe();
    this.restart.unsubscribe();
  }

  loadComponent(view: ViewContainerRef) {
    const viewID = this.viewContainerArray.indexOf(view);
    // Choix aléatoire d'une pièce et ajout de celle ci dans le jeu logique
    this.gameService.addPiece(viewID);
    // Préparer la recette de cette pièce
    const ComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CommonBlocComponent
    );
    // Nettoyer l'ancien component du DOM
    view.clear();
    // Créer la pièce
    view.createComponent(ComponentFactory);
  }

  loadAllComponents() {
    for (const view of this.viewContainerArray) {
      this.loadComponent(view);
    }
  }

  menu(event: boolean): void {
    this.messageMenu = 'pause';
    this.displayMenu = event;
  }

  showSettings(event: boolean): void {
    this.displaySettings = event;
  }
}
