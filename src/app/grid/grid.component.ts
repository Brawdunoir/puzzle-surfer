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
  private eventsSubscription: Subscription;

  dimensions: number;
  blocUnit: number;
  // grid: boolean[];
  // @Input() indexReceived: Observable<void>;
  tiles: Tile[] = [];

  constructor(private multiService: MultiService, private basic: BasicService) {
  }

  ngOnInit(): void {
    this.blocUnit = this.basic.blocUnit;
    this.dimensions = this.basic.dimensions;
    this.tiles = this.basic.tiles;
  }
}
