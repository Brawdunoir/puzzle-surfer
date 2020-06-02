import { Injectable } from '@angular/core';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root',
})
export class FormeService {
  color = {
    tetris: '#ba68c8',
    cube: '#7986cb',
    line: '#4fc3f7',
    doubleLine: '#81c784',
    crooked: '#ff8a65',
    l: '#e57373',
  };

  priority = {
    low: 1,
    normal: 2,
    high: 3,
    veryHigh: 4,
  };
  dim = this.basic.dimensions;

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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.veryHigh,
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
      priority: this.priority.normal,
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
      priority: this.priority.low,
    },
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
      priority: this.priority.high,
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
      priority: this.priority.normal,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.high,
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
      priority: this.priority.normal,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.normal,
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
      priority: this.priority.normal,
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
      priority: this.priority.normal,
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
      priority: this.priority.normal,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
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
      priority: this.priority.low,
    },
  ];

  constructor(private basic: GridService) {}

  updateJumps() {
    this.dim = this.basic.dimensions;

    this.formes.forEach((forme) => {
      forme.jumps = [];
      for (const position of forme.positions) {
        forme.jumps.push(position.x + position.y * this.dim);
      }
    });
  }
}
