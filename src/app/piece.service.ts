import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  random: number;

  dim = this.basic.dimensions;

  formes = [
    {
      // * Tetris - 1
      dimensions: {
        x: 3,
        y: 2
      },
      positions: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1, this.dim + 2],
      color: '#fff59d',
    },
    {
      // * Tetris - 2
      dimensions: {
        x: 3,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 1, 2, this.dim + 1],
      color: '#fff59d',
    },
    {
      // * Tetris - 3
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
      ],
      jumps: [0, this.dim, this.dim + 1, 2 * this.dim],
      color: '#fff59d',
    },
    {
      // * Tetris - 4
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1, 2 * this.dim + 1],
      color: '#fff59d',
    },
    {
      // * Small Cube
      dimensions: {
        x: 1,
        y: 1
      },
      positions: [
        { x: 0, y: 0 },
      ],
      jumps: [0],
      color: '#304ffe',
    },
    {
      // * Medium Cube
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ],
      jumps: [0, 1, this.dim, this.dim + 1],
      color: '#c51162',
    },
    {
      // * Large Cube
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      jumps: [0, 1, 2, this.dim, this.dim + 1, this.dim + 2, 2 * this.dim, 2 * this.dim + 1, 2 * this.dim + 2],
      color: '#aa00ff',
    },
    {
      // * Medium Cross
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      jumps: [1, this.dim, this.dim + 1, this.dim + 2, 2 * this.dim + 1],
      color: '#d50000',
    },
    // {
    //   // * Large Cross
    //   dimensions: {
    //     x: 5,
    //     y: 5
    //   },
    //   positions: [
    //     { x: 2, y: 0 },
    //     { x: 2, y: 1 },
    //     { x: 0, y: 2 },
    //     { x: 1, y: 2 },
    //     { x: 2, y: 2 },
    //     { x: 3, y: 2 },
    //     { x: 4, y: 2 },
    //     { x: 2, y: 3 },
    //     { x: 2, y: 4 },
    //   ],
    //   jumps: [2, this.dim + 2, 2 * this.dim, 2 * this.dim + 1, 2 * this.dim + 2, 2 * this.dim + 3,
    //     2 * this.dim + 4, 3 * this.dim + 2, 4 * this.dim + 2],
    //   color: '#d50000',
    // },
    {
      // * 2 Horizontal Line
      dimensions: {
        x: 2,
        y: 1
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      jumps: [0, 1],
      color: '#9575cd',
    },
    {
      // * 3 Horizontal Line
      dimensions: {
        x: 3,
        y: 1
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 1, 2],
      color: '#ffd54f',
    },
    {
      // * 3 Horizontal Line Double
      dimensions: {
        x: 3,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      jumps: [0, 1, 2, this.dim, this.dim + 1, this.dim + 2],
      color: '#ffd54f',
    },
    {
      // * 4 Horizontal Line
      dimensions: {
        x: 4,
        y: 1
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      jumps: [0, 1, 2, 3],
      color: '#00c853',
    },
    {
      // * 4 Horizontal Line Double
      dimensions: {
        x: 4,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      jumps: [0, 1, 2, 3, this.dim, this.dim + 1, this.dim + 2, this.dim + 3],
      color: '#00c853',
    },
    {
      // * 5 Horizontal Line
      dimensions: {
        x: 5,
        y: 1
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
      ],
      jumps: [0, 1, 2, 3, 4],
      color: '#dd2c00',
    },
    {
      // * 5 Horizontal Line Double
      dimensions: {
        x: 5,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
      ],
      jumps: [0, 1, 2, 3, 4, this.dim, this.dim + 1, this.dim + 2, this.dim + 3, this.dim + 4],
      color: '#dd2c00',
    },
    {
      // * 2 Vertical Line
      dimensions: {
        x: 1,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, this.dim],
      color: '#9575cd',
    },
    {
      // * 3 Vertical Line
      dimensions: {
        x: 1,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this.dim],
      color: '#ffd54f',
    },
    {
      // * 3 Vertical Line Double
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      jumps: [0, 1, this.dim, this.dim + 1, 2 * this.dim, 2 * this.dim + 1],
      color: '#ffd54f',
    },
    {
      // * 4 Vertical Line
      dimensions: {
        x: 1,
        y: 4
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 3 * this.dim],
      color: '#00c853',
    },
    {
      // * 4 Vertical Line Double
      dimensions: {
        x: 2,
        y: 4
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
      jumps: [0, 1, this.dim, this.dim + 1, 2 * this.dim, 2 * this.dim + 1, 3 * this.dim, 3 * this.dim + 1],
      color: '#00c853',
    },
    {
      // * 5 Vertical Line
      dimensions: {
        x: 1,
        y: 5
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 3 * this.dim, 4 * this.dim],
      color: '#dd2c00',
    },
    {
      // * 5 Vertical Line Double
      dimensions: {
        x: 2,
        y: 5
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
        { x: 1, y: 4 },
      ],
      jumps: [0, 1, this.dim, this.dim + 1, 2 * this.dim, 2 * this.dim + 1, 3 * this.dim, 3 * this.dim + 1, 4 * this.dim, 4 * this.dim + 1],
      color: '#dd2c00',
    },
    {
      // * Medium Crooked - 1
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      jumps: [0, 1, this.dim + 1],
      color: '#ffab00',
    },
    {
      // * Medium Crooked - 2
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, 1, this.dim],
      color: '#81d4fa',
    },
    {
      // * Medium Crooked - 3
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      jumps: [0, this.dim, this.dim + 1],
      color: '#ffe082',
    },
    {
      // * Medium Crooked - 4
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1],
      color: '#00c853',
    },
    {
      // * Medium Horizontal L - 1
      dimensions: {
        x: 4,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 1 },
      ],
      jumps: [0, 1, 2, 3, this.dim + 3],
      color: '#6200ea',
    },
    {
      // * Medium Horizontal L - 2
      dimensions: {
        x: 4,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, 1, 2, 3, this.dim],
      color: '#2962ff',
    },
    {
      // * Medium Horizontal L - 3
      dimensions: {
        x: 4,
        y: 2
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 0 },
      ],
      jumps: [0, this.dim, this.dim + 1, this.dim + 2, this.dim + 3],
      color: '#80deea',
    },
    {
      // * Medium Horizontal L - 4
      dimensions: {
        x: 4,
        y: 2
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 0 },
      ],
      jumps: [this.dim, this.dim + 1, this.dim + 2, this.dim + 3, 3],
      color: '#ffab91',
    },
    {
      // * Large Crooked - 1
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      jumps: [0, 1, 2, this.dim + 2, 2 * this.dim + 2],
      color: '#d50000',
    },
    {
      // * Large Crooked - 2
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, 2, this.dim, 2 * this.dim],
      color: '#d50000',
    },
    {
      // * Large Crooked - 3
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 2 * this.dim + 1, 2 * this.dim + 2],
      color: '#d50000',
    },
    {
      // * Large Crooked - 4
      dimensions: {
        x: 3,
        y: 3
      },
      positions: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [2, this.dim + 2, 2 * this.dim + 2, 2 * this.dim, 2 * this.dim + 1],
      color: '#d50000',
    },
    {
      // * Medium Vertical L - 1
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      jumps: [0, 1, this.dim + 1, 2 * this.dim + 1],
      color: '#d50000',
    },
    {
      // * Medium Vertical L - 2
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, this. dim, 2 * this.dim],
      color: '#d50000',
    },
    {
      // * Medium Vertical L - 3
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this. dim, 2 * this.dim + 1],
      color: '#d50000',
    },
    {
      // * Medium Vertical L - 4
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      jumps: [1, this.dim + 1, 2 * this. dim + 1, 2 * this.dim],
      color: '#d50000',
    },
    {
      // * U - 1
      dimensions: {
        x: 3,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 2, this.dim, this.dim + 1, this. dim + 2],
      color: '#d50000',
    },
    {
      // * U - 2
      dimensions: {
        x: 3,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ],
      jumps: [0, 1, 2, this.dim, this.dim + 2],
      color: '#d50000',
    },
    {
      // * U - 3
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [0, 1, this.dim, 2 * this.dim, 2 * this.dim + 1],
      color: '#d50000',
    },
    {
      // * U - 4
      dimensions: {
        x: 2,
        y: 3
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, this.dim + 1, 2 * this.dim + 1, 2 * this.dim],
      color: '#d50000',
    },
  ];

  constructor(private basic: BasicService) { }

  getRandomID(): void {
    this.random = Math.floor(Math.random() * Math.floor(this.formes.length));
  }
}
