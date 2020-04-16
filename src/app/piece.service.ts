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
      // * Tetris
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
      color: '#d50000',
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
      // * 2-Horizontal Line
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
      // * 3-Horizontal Line
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
      // * 4-Horizontal Line
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
      // * 5-Horizontal Line
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
      // * Crooked-01
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
      // * Crooked-02
      dimensions: {
        x: 2,
        y: 2
      },
      positions: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 1 },
      ],
      jumps: [0, 1, this.dim],
      color: '#81d4fa',
    },
    {
      // * Crooked-03
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
      // * Crooked-04
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
      // * Medium Horizontal L - 01
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
      // * Medium Horizontal L - 02
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
      color: '#6200ea',
    },
    {
      // * Medium Horizontal L - 03
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
      color: '#6200ea',
    },
    {
      // * Medium Horizontal L - 02
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
      color: '#6200ea',
    },
  ];

  constructor(private basic: BasicService) { }

  getRandomID(): void {
    this.random = Math.floor(Math.random() * Math.floor(this.formes.length));
  }
}
