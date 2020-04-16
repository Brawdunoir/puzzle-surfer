import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MultiService } from '../multi.service';
import { Tile } from '../tile-item';
import { BasicService } from '../basic.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  dimensions: number;
  blocUnit: number;
  tiles: Tile[] = [];

  constructor(private multiService: MultiService, private basic: BasicService) {
  }

  ngOnInit(): void {
    this.blocUnit = this.basic.blocUnit;
    this.dimensions = this.basic.dimensions;
    this.tiles = this.basic.tiles;
  }
}
