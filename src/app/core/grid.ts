import { Graphics } from 'pixi.js';

export class Grid extends Graphics {
    canvasWidth: number;
    canvasHeight: number
  gridSpacing = 20; // pixels
  gridLineWidth = 1;
  gridColor = '#f1f1f1';

  constructor(width: number, height: number) {
    super();
    console.log(width, height);
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  drawGrid(): void {
    console.log("START DRAWING GRID");
    const originX = 0;
    const originY = 0;
    var offsetX = this.calculateGridOffset(-originX);
    var offsetY = this.calculateGridOffset(-originY);

    for (var x = 0; x <= (this.canvasWidth / this.gridSpacing); x++) {
      this.drawLine(this.gridSpacing * x + offsetX, 0, this.gridSpacing * x + offsetX, this.canvasHeight);
    }
    for (var y = 0; y <= (this.canvasHeight / this.gridSpacing); y++) {
      this.drawLine(0, this.gridSpacing * y + offsetY, this.canvasWidth, this.gridSpacing * y + offsetY);
    }
  }

  /** returns n where -gridSize/2 < n <= gridSize/2  */
  private calculateGridOffset(n: number): number {
    if (n >= 0) {
      return (
        ((n + this.gridSpacing / 2.0) % this.gridSpacing) -
        this.gridSpacing / 2.0
      );
    } else {
      return (
        ((n - this.gridSpacing / 2.0) % this.gridSpacing) +
        this.gridSpacing / 2.0
      );
    }
  }

  private drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ): void {
    this.setStrokeStyle({ width: this.gridLineWidth, color: this.gridColor })
      .moveTo(startX, startY)
      .lineTo(endX, endY)
      .stroke();
  }
}
