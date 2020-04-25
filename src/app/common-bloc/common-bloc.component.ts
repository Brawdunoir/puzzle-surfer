import { Component } from '@angular/core';
import { IndexService } from '../index.service';
import { BasicService } from '../basic.service';
import { GameService } from '../game.service';
import { PieceService } from '../piece.service';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-common-bloc',
  templateUrl: './common-bloc.component.html',
  styleUrls: ['./common-bloc.component.scss'],
})
export class CommonBlocComponent {
  blocUnit = this.basic.blocUnit;

  PIECE_ID = this.pieceService.currentPieceID;
  VIEW_ID = this.pieceService.currentViewID;
  POSITIONS = this.pieceService.formes[this.PIECE_ID].positions;
  DIMENSIONS = this.pieceService.formes[this.PIECE_ID].dimensions;
  JUMPS = this.pieceService.formes[this.PIECE_ID].jumps;
  COLOR = this.pieceService.formes[this.PIECE_ID].color;

  private isScale = true;
  private display = true;
  private getBack = false;

  constructor(
    private indexService: IndexService,
    private basic: BasicService,
    private gameService: GameService,
    private pieceService: PieceService,
    private variable: VariableService
  ) {}

  onDragStarted() {
    this.isScale = false;
    this.getBack = false;
  }

  async onDragEnded(event: any) {
    const index: number[] = this.indexService.get(event, this.JUMPS);

    if (this.indexService.isSuitable(index)) {
      this.gameService.uponIndexReceived(index, this.PIECE_ID, this.VIEW_ID, this.COLOR);
      await this.variable.delay(this.variable.tilePutDelay);
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
      transition: this.getBack ? this.variable.pieceTransition : 'initial',
    };
    return styles;
  }

  setStyleSub(width: number, height: number) {
    const styles = {
      'height.px': this.blocUnit * height,
      'width.px': this.blocUnit * width,
      display: this.display ? '' : 'none',
      transform: this.isScale
        ? this.variable.pieceHalf
        : this.variable.pieceFull(this.blocUnit * height),
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
      'box-shadow': this.isScale ? '' : this.variable.tileShadow,
    };

    return styles;
  }
}
