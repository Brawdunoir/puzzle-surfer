import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPiece1]'
})
export class PieceDirective1 {

  constructor(public viewContainerRef: ViewContainerRef) {
   }

}

@Directive({
  selector: '[appPiece2]'
})
export class PieceDirective2 {

  constructor(public viewContainerRef: ViewContainerRef) {
   }

}

@Directive({
  selector: '[appPiece3]'
})
export class PieceDirective3 {

  constructor(public viewContainerRef: ViewContainerRef) {
   }

}