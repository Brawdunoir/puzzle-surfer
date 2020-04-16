import { Component } from '@angular/core';
import { MultiService } from '../multi.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';
import { PieceService } from '../piece.service';

@Component({
  selector: 'app-common-bloc',
  templateUrl: './common-bloc.component.html',
  styleUrls: ['./common-bloc.component.scss'],
})
export class CommonBlocComponent {
  // ! ID of the piece, that's only its position in piece.service
  PIECE_ID = this.pieceService.random;

  blocUnit = this.basic.blocUnit;
  POSITIONS = this.pieceService.formes[this.PIECE_ID].positions;
  DIMENSIONS = this.pieceService.formes[this.PIECE_ID].dimensions;
  JUMPS = this.pieceService.formes[this.PIECE_ID].jumps;
  COLOR = this.pieceService.formes[this.PIECE_ID].color;

  private isScale = true;
  private display = true;
  private getBack = false;

  constructor(
    private multiService: MultiService,
    private basic: BasicService,
    private gameService: GameService,
    private pieceService: PieceService
  ) {}

  onDragStarted() {
    this.isScale = false;
    this.getBack = false;
  }

  onDragEnded(event: any) {
    const index: number[] = this.multiService.getIndex(event, this.JUMPS);

    if (this.multiService.isSuitable(index)) {
      this.gameService.uponIndexReceived(index, this.PIECE_ID, this.COLOR);
      this.display = false;
    } else {
      this.resetStyle(event);
    }
  }

  resetStyle(event: any) {
    event.source._dragRef.reset();
    this.isScale = true;
    this.getBack = true;
  }

  setStyleContainer() {
    const styles = {
      transition: this.getBack
        ? 'transform 300ms cubic-bezier(.21,.74,.04,1.02)'
        : 'initial',
    };
    return styles;
  }

  setStyleSub(width: number, height: number) {
    const styles = {
      'height.px': this.blocUnit * height,
      'width.px': this.blocUnit * width,
      display: this.display ? '' : 'none',
      transform: this.isScale
        ? 'scale(0.5) translateY(0)'
        : 'scale(1) translateY(0)',
    };
    return styles;
  }

  setStyleTile(left: number, top: number, color: string) {
    const styles = {
      'height.px': this.blocUnit,
      'width.px': this.blocUnit,
      'left.px': this.blocUnit * left,
      'top.px': this.blocUnit * top,
      'background-color': color,
    };
    return styles;
  }
}
