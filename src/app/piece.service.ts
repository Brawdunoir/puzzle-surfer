import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { FormeService } from './forme.service';

@Injectable({
  providedIn: 'root',
})
export class PieceService {

  dim = this.basic.dimensions;

  random: number;

  formesInGameID: number[] = [];

  formes = this.forme.formes;

  constructor(private basic: BasicService, private forme: FormeService) {}

  /** Retourne un nombre random d'une pièce afin qu'elle soit créé
   *  dans GameComponent grâce à un CommonBlocComponent.
   */
  getRandomID(): void {
    const i = Math.floor(
      Math.random() * Math.floor(this.formesInGameID.length)
    );
    this.random = this.formesInGameID[i];
  }

  /** Garder que l'id de certaines pièces
   *  adpatées à la taille de la grille.
   */
  init() {
    this.formesInGameID = [];
    for (let i = 0; i < this.formes.length; i++) {
      const forme = this.formes[i];
      if (
        forme.dimensions.x <= Math.round(this.dim / 3) &&
        forme.dimensions.y <= Math.round(this.dim / 3)
      ) {
        this.formesInGameID.push(i);
      }
    }
  }
}
