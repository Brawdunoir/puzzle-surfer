import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariableService {
  defaultGridSize = 12;

  tileHalf = 0.5; // scale css property
  tileFull = 0.9;
  tilePutDelay = 100; // millisecondes
  tileDeleteDelay = 220;
  tileShadow =
    '0 6.4px 14.4px 0 rgba(0,0,0,.066), 0 1.2px 3.6px 0 rgba(0,0,0,.05)';

  pieceTransition = 'transform 300ms cubic-bezier(.21,.74,.04,1.02)';
  pieceHalf = 'scale(0.5) translateY(0)';

  constructor() {}

  pieceTranslate(translate: number): number {
    const min = 80;
    const max = 120;

    translate = translate > max ? max : translate;
    translate = translate < min ? min : translate;

    return translate;
  }

  pieceFull(translate: number): string {
    return 'scale(1) translateY(-' + this.pieceTranslate(translate) + 'px)';
  }

  delay(millisecondes: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecondes));
  }
}
