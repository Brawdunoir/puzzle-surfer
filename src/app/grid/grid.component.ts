import { Component, OnInit, OnDestroy } from '@angular/core';
import { Tile } from '../tile-item';
import { GridService } from '../grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit, OnDestroy {
  dimensions = this.grid.getDimensions();
  blocUnit: number;
  tiles: Tile[] = [];

  update: any;

  constructor(private grid: GridService) {}

  ngOnInit(): void {
    this.tiles = this.grid.tiles;

    this.update = this.grid.update.subscribe((value) => {
      this.tiles = value;
      this.dimensions = this.grid.getDimensions();
      this.blocUnit = this.grid.getWidth();
    });
  }

  ngOnDestroy(): void {
    this.update.unsubscribe();
  }
}
