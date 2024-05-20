import { Graphics } from 'pixi.js';

/** Grid in the background */
export class Grid extends Graphics {
    canvasWidth: number;
    canvasHeight: number
  gridSpacing = 20; // pixels
  gridLineWidth = 1;
  gridColor = '#f1f1f1';

  constructor(width: number, height: number) {
    super();
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  drawGrid(): void {
    for (var x = 0; x <= (this.canvasWidth / this.gridSpacing); x++) {
      this.drawLine(this.gridSpacing * x, 0, this.gridSpacing * x, this.canvasHeight);
    }
    for (var y = 0; y <= (this.canvasHeight / this.gridSpacing); y++) {
      this.drawLine(0, this.gridSpacing * y , this.canvasWidth, this.gridSpacing * y );
    }
  }

  private drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): void {
    this.setStrokeStyle({ width: this.gridLineWidth, color: 'red' })
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke();
  }
}
