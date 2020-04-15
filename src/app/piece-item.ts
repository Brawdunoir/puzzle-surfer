import { Type } from '@angular/core';

export class PieceItem {
  constructor(public component: Type<any>, jump: number[]) { }
}