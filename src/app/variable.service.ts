import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VariableService {
  defaultColor = '#11100f';

  tileHalf = 0.5;
  tileFull = 0.9;

  tilePutDelay = 100;
  tileDeleteDelay = 220;

  pieceTransition = 'transform 300ms cubic-bezier(.21,.74,.04,1.02)';
  pieceHalf = 'scale(0.5)';
  pieceFull = 'scale(1)';

  constructor() {}

  delay(millisecondes: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, millisecondes));
  }
}
