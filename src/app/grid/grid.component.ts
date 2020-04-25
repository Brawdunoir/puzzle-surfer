import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tile } from '../tile-item';
import { BasicService } from '../basic.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  dimensions = this.basic.dimensions;
  blocUnit = this.basic.blocUnit;
  tiles: Tile[] = [];

  update: any;

  constructor(private basic: BasicService) {}

  ngOnInit(): void {
    this.tiles = this.basic.tiles;

    this.update = this.basic.update.subscribe((value) => {
      this.tiles = value;
      this.dimensions = this.basic.dimensions;
      this.blocUnit = this.basic.blocUnit;
    });
  }

  ngOnDestroy(): void {
    this.update.unsubscribe();
  }
}
