import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root',
})
export class PieceService {
  random: number;

  dim = this.basic.dimensions;

  color = {
    tetris: '#ba68c8',
    cube: '#fff176',
    cross: '#e57373',
    line: '#4fc3f7',
    doubleLine: '#81c784',
    crooked: '#ff8a65',
    l: '#7986cb',
    u: '#a1887f',
  };

  formes = [
    {
      // * Tetris - 1
      dimensions: {
        x: 3,
        y: 2,
      },
      positions: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1, this.dim + 2],
      color: this.color.tetris,
    },
    {
      // * Tetris - 2
      dimensions: {
        x: 3,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 1, 2, this.dim + 1],
      color: this.color.tetris,
    },
    {
      // * Tetris - 3
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 1 },
      ],
      jumps: [0, this.dim, this.dim + 1, 2 * this.dim],
      color: this.color.tetris,
    },
    {
      // * Tetris - 4
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1, 2 * this.dim + 1],
      color: this.color.tetris,
    },
    {
      // * Small Cube
      dimensions: {
        x: 1,
        y: 1,
      },
      positions: [{ x: 0, y: 0 }],
      jumps: [0],
      color: this.color.cube,
    },
    {
      // * Medium Cube
      dimensions: {
        x: 2,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ],
      jumps: [0, 1, this.dim, this.dim + 1],
      color: this.color.cube,
    },
    {
      // * Large Cube
      dimensions: {
        x: 3,
        y: 3,
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
      jumps: [
        0,
        1,
        2,
        this.dim,
        this.dim + 1,
        this.dim + 2,
        2 * this.dim,
        2 * this.dim + 1,
        2 * this.dim + 2,
      ],
      color: this.color.cube,
    },
    {
      // * Medium Cross
      dimensions: {
        x: 3,
        y: 3,
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
      ],
      jumps: [1, this.dim, this.dim + 1, this.dim + 2, 2 * this.dim + 1],
      color: this.color.cross,
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
    //   color: this.color.cross,
    // },
    {
      // * 2 Horizontal Line
      dimensions: {
        x: 2,
        y: 1,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
      ],
      jumps: [0, 1],
      color: this.color.line,
    },
    {
      // * 3 Horizontal Line
      dimensions: {
        x: 3,
        y: 1,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 1, 2],
      color: this.color.line,
    },
    {
      // * 3 Horizontal Line Double
      dimensions: {
        x: 3,
        y: 2,
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
      color: this.color.line,
    },
    {
      // * 4 Horizontal Line
      dimensions: {
        x: 4,
        y: 1,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
      jumps: [0, 1, 2, 3],
      color: this.color.line,
    },
    {
      // * 4 Horizontal Line Double
      dimensions: {
        x: 4,
        y: 2,
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
      color: this.color.doubleLine,
    },
    {
      // * 5 Horizontal Line
      dimensions: {
        x: 5,
        y: 1,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
      ],
      jumps: [0, 1, 2, 3, 4],
      color: this.color.line,
    },
    {
      // * 5 Horizontal Line Double
      dimensions: {
        x: 5,
        y: 2,
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
      jumps: [
        0,
        1,
        2,
        3,
        4,
        this.dim,
        this.dim + 1,
        this.dim + 2,
        this.dim + 3,
        this.dim + 4,
      ],
      color: this.color.doubleLine,
    },
    {
      // * 2 Vertical Line
      dimensions: {
        x: 1,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, this.dim],
      color: this.color.line,
    },
    {
      // * 3 Vertical Line
      dimensions: {
        x: 1,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this.dim],
      color: this.color.line,
    },
    {
      // * 3 Vertical Line Double
      dimensions: {
        x: 2,
        y: 3,
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
      color: this.color.doubleLine,
    },
    {
      // * 4 Vertical Line
      dimensions: {
        x: 1,
        y: 4,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 3 * this.dim],
      color: this.color.line,
    },
    {
      // * 4 Vertical Line Double
      dimensions: {
        x: 2,
        y: 4,
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
      jumps: [
        0,
        1,
        this.dim,
        this.dim + 1,
        2 * this.dim,
        2 * this.dim + 1,
        3 * this.dim,
        3 * this.dim + 1,
      ],
      color: this.color.doubleLine,
    },
    {
      // * 5 Vertical Line
      dimensions: {
        x: 1,
        y: 5,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
        { x: 0, y: 4 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 3 * this.dim, 4 * this.dim],
      color: this.color.line,
    },
    {
      // * 5 Vertical Line Double
      dimensions: {
        x: 2,
        y: 5,
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
      jumps: [
        0,
        1,
        this.dim,
        this.dim + 1,
        2 * this.dim,
        2 * this.dim + 1,
        3 * this.dim,
        3 * this.dim + 1,
        4 * this.dim,
        4 * this.dim + 1,
      ],
      color: this.color.doubleLine,
    },
    {
      // * Medium Crooked - 1
      dimensions: {
        x: 2,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      jumps: [0, 1, this.dim + 1],
      color: this.color.crooked,
    },
    {
      // * Medium Crooked - 2
      dimensions: {
        x: 2,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, 1, this.dim],
      color: this.color.crooked,
    },
    {
      // * Medium Crooked - 3
      dimensions: {
        x: 2,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      jumps: [0, this.dim, this.dim + 1],
      color: this.color.crooked,
    },
    {
      // * Medium Crooked - 4
      dimensions: {
        x: 2,
        y: 2,
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      jumps: [1, this.dim, this.dim + 1],
      color: this.color.crooked,
    },
    {
      // * Medium Horizontal L - 1
      dimensions: {
        x: 4,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 3, y: 1 },
      ],
      jumps: [0, 1, 2, 3, this.dim + 3],
      color: this.color.l,
    },
    {
      // * Medium Horizontal L - 2
      dimensions: {
        x: 4,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 0, y: 1 },
      ],
      jumps: [0, 1, 2, 3, this.dim],
      color: this.color.l,
    },
    {
      // * Medium Horizontal L - 3
      dimensions: {
        x: 4,
        y: 2,
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 0, y: 0 },
      ],
      jumps: [0, this.dim, this.dim + 1, this.dim + 2, this.dim + 3],
      color: this.color.l,
    },
    {
      // * Medium Horizontal L - 4
      dimensions: {
        x: 4,
        y: 2,
      },
      positions: [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
        { x: 3, y: 0 },
      ],
      jumps: [this.dim, this.dim + 1, this.dim + 2, this.dim + 3, 3],
      color: this.color.l,
    },
    {
      // * Large Crooked - 1
      dimensions: {
        x: 3,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
      ],
      jumps: [0, 1, 2, this.dim + 2, 2 * this.dim + 2],
      color: this.color.crooked,
    },
    {
      // * Large Crooked - 2
      dimensions: {
        x: 3,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, 2, this.dim, 2 * this.dim],
      color: this.color.crooked,
    },
    {
      // * Large Crooked - 3
      dimensions: {
        x: 3,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 2 * this.dim + 1, 2 * this.dim + 2],
      color: this.color.crooked,
    },
    {
      // * Large Crooked - 4
      dimensions: {
        x: 3,
        y: 3,
      },
      positions: [
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [
        2,
        this.dim + 2,
        2 * this.dim + 2,
        2 * this.dim,
        2 * this.dim + 1,
      ],
      color: this.color.crooked,
    },
    {
      // * Medium Vertical L - 1
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      jumps: [0, 1, this.dim + 1, 2 * this.dim + 1],
      color: this.color.l,
    },
    {
      // * Medium Vertical L - 2
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, this.dim, 2 * this.dim],
      color: this.color.l,
    },
    {
      // * Medium Vertical L - 3
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [0, this.dim, 2 * this.dim, 2 * this.dim + 1],
      color: this.color.l,
    },
    {
      // * Medium Vertical L - 4
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      jumps: [1, this.dim + 1, 2 * this.dim + 1, 2 * this.dim],
      color: this.color.l,
    },
    {
      // * U - 1
      dimensions: {
        x: 3,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      jumps: [0, 2, this.dim, this.dim + 1, this.dim + 2],
      color: this.color.u,
    },
    {
      // * U - 2
      dimensions: {
        x: 3,
        y: 2,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 2, y: 1 },
      ],
      jumps: [0, 1, 2, this.dim, this.dim + 2],
      color: this.color.u,
    },
    {
      // * U - 3
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      jumps: [0, 1, this.dim, 2 * this.dim, 2 * this.dim + 1],
      color: this.color.u,
    },
    {
      // * U - 4
      dimensions: {
        x: 2,
        y: 3,
      },
      positions: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      jumps: [0, 1, this.dim + 1, 2 * this.dim + 1, 2 * this.dim],
      color: this.color.u,
    },
  ];

  constructor(private basic: BasicService) {}

  getRandomID(): void {
    this.random = Math.floor(Math.random() * Math.floor(this.formes.length));
  }
}
