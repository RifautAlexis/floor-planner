import { Graphics } from 'pixi.js';
import { gridSpace } from '../config';

/** Grid in the background */
export class Grid extends Graphics {
  canvasWidth: number;
  canvasHeight: number;
  gridSpacing = gridSpace; // pixels

  constructor(width: number, height: number) {
    super();
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  drawGrid(): void {
    for (var x = 0; x <= this.canvasWidth / this.gridSpacing; x++) {
      this.drawLine(
        this.gridSpacing * x,
        0,
        this.gridSpacing * x,
        this.canvasHeight,
        x % 5 === 0
      );
    }
    for (var y = 0; y <= this.canvasHeight / this.gridSpacing; y++) {
      this.drawLine(
        0,
        this.gridSpacing * y,
        this.canvasWidth,
        this.gridSpacing * y,
        y % 5 === 0
      );
    }
  }

  private drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isMainLine: boolean
  ): void {
    this.setStrokeStyle({
      width: isMainLine ? 2 : 1,
      color: isMainLine ? '#999999' : '#bcbcbc',
    })
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke();
  }
}
