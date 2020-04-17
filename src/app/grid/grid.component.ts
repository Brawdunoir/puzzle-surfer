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

  dimensions = this.basic.dimensions;
  blocUnit = this.basic.blocUnit;
  tiles: Tile[] = [];

  constructor(private multiService: MultiService, private basic: BasicService) {
  }

  ngOnInit(): void {
    this.tiles = this.basic.tiles;
  }
}
